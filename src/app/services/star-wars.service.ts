import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, Subject, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItemInterface } from "../star-wars/topic-item.interface"
import { PeopleInterface } from "../star-wars/people/people.interface"
import { PlanetInterface } from "../star-wars/planet/planet-interface";
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
  listChanged = new Subject<TopicItemInterface[]>();

  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }

  constructor(private http: HttpClient) {}

  getListFromApi(topic: StarWarsTopic): Observable<TopicItemInterface[]> {
    return this.http
      .get<TopicItemInterface[]>(`${this.baseUrls.tech}${topic}`)
      .pipe(
        map((data: any) => {
            return data.results
          }
        )
      )
  }

  getListItem(topic: StarWarsTopic, id: string): Observable<PeopleInterface|PlanetInterface|StarshipInterface> {
    return this.http
      .get<PeopleInterface|PlanetInterface|StarshipInterface>(`${this.baseUrls.tech}${topic}/${id}`)
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
  ): Observable<PeopleInterface[]|PlanetInterface[]|StarshipInterface[]> {
    console.log(`${this.baseUrls.dev}${topic}/?search=${value}`)
    return this.http
      .get<PeopleInterface[]|PlanetInterface[]|StarshipInterface[]>(`${this.baseUrls.dev}${topic}/?search=${value}`)
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
}
