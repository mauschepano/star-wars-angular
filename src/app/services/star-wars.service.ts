import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItemInterface } from "../star-wars/topic-item.interface"
import { PeopleInterface } from "../star-wars/people/people.interface"
import { Planet } from "../star-wars/planet/planet";
import { StarshipInterface } from "../star-wars/starship/starship-interface";

export enum StarWarsTopic {
  People = '/people',
  Planets = '/planets',
  Starships = '/starships',
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  topicList: TopicItemInterface[];
  loader$: boolean = false

  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }

  private _planets$ = new BehaviorSubject<TopicItemInterface[]>([]);
  constructor(private http: HttpClient) {}
  get planets$(): Observable<TopicItemInterface[]> {
    return this._planets$.asObservable();
  }

  getSubscription() {
    this.getListFromApi(StarWarsTopic.People)
      .subscribe({
        next: (resultList: TopicItemInterface[]) => {
          this.loader$ = false
          this.topicList = resultList
          console.log('next')
          return this.topicList

        },
        error: (error) => {
          alert('Oops, something went wrong!')
          console.error(error)
        },
        complete: () => {
          console.log('complete')
          return this.topicList
        }
    })
  }

  getListFromApi(topic: StarWarsTopic): Observable<TopicItemInterface[]> {
    this.loader$ = true
    return this.http
      .get<TopicItemInterface[]>(`${this.baseUrls.tech}${topic}`)
      .pipe(
        map((data: any) => {
            return data.results
          }
        )
      )
  }

  getListItem(topic: StarWarsTopic, id: string): Observable<PeopleInterface|Planet|StarshipInterface> {
    return this.http
      .get<PeopleInterface|Planet|StarshipInterface>(`${this.baseUrls.tech}${topic}/${id}`)
      .pipe(
        map((data: any) => {
            return data.result.properties
          }
        )
      );
  }

  getSearchedItem(
    topic: StarWarsTopic,
    value: string
  ): Observable<PeopleInterface[]|Planet[]|StarshipInterface[]> {
    console.log(`${this.baseUrls.dev}${topic}/?search=${value}`)
    return this.http
      .get<PeopleInterface[]|Planet[]|StarshipInterface[]>(`${this.baseUrls.dev}${topic}/?search=${value}`)
      .pipe(
        map((data: any) => {
            return data.results
          }
        ),
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  public loadPlanetValues(){
    return this.getListFromApi(StarWarsTopic.Planets).pipe(tap((planets: TopicItemInterface[]) => {
        this._planets$.next(planets);
    })
    )
  }
}
