import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItemInterface } from "../star-wars/topic-item.interface"
import { People } from "../star-wars/people/people"
import { Planet } from "../star-wars/planet/planet";
import { Starship } from "../star-wars/starship/starship";
import { ActivatedRoute, Params } from "@angular/router";

export enum StarWarsTopic {
  People = '/people',
  Planets = '/planets',
  Starships = '/starships',
}

export enum StarWarsTopic1 {
  People = 'people',
  Planets = 'planets',
  Starships = 'starships',
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  topicList: TopicItemInterface[]
  loader$: boolean = false

  private _planets$ = new BehaviorSubject<TopicItemInterface[]>([])
  private _listItems$ = new BehaviorSubject<TopicItemInterface[]>([])
  private _activeTopic$ = new BehaviorSubject<StarWarsTopic1>(StarWarsTopic1.People)
  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    console.log('serv con')
    this.activeTopic$
      .pipe(tap((topic: StarWarsTopic1) => {
        console.log(topic);
        this.loadListItems(topic)
      }))
      .subscribe()

  }

  get planets$(): Observable<TopicItemInterface[]> {
    return this._planets$.asObservable();
  }

  get activeTopic$(): Observable<StarWarsTopic1> {
    console.log(this._activeTopic$)
    return this._activeTopic$.asObservable();
  }

  get listItems$(): Observable<TopicItemInterface[]> {
    return this._listItems$.asObservable();
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

  updateTopic(topic: StarWarsTopic1): void {
    this._activeTopic$.next(topic)
  }

  getListItem(topic: StarWarsTopic, id: string): Observable<People|Planet|Starship> {
    return this.http
      .get<People|Planet|Starship>(`${this.baseUrls.tech}${topic}/${id}`)
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
  ): Observable<People[]|Planet[]|Starship[]> {
    console.log(`${this.baseUrls.dev}${topic}/?search=${value}`)
    return this.http
      .get<People[]|Planet[]|Starship[]>(`${this.baseUrls.dev}${topic}/?search=${value}`)
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

  private loadListItems(topic: StarWarsTopic1){
    return this.getListFromApi(`/${topic}` as StarWarsTopic)
  }

  public loadPlanetValues(){
    return this.getListFromApi(StarWarsTopic.Planets).pipe(tap((planets: TopicItemInterface[]) => {
        this._planets$.next(planets);
      })
    )
  }

  public loadItemsByRoute(): Observable<TopicItemInterface[]> {
    return this.route.params
      .pipe(
        tap((params) => console.log(params)),
        switchMap((params: Params) => this.loadListItems(params['topic'])),
        tap((items) => this._listItems$.next(items))
      )
  }
}
