import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, EMPTY, empty, Observable, ObservableInput, tap, throwError } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { TopicItem } from "../../models/topic-item.interface"
import { Planet } from "../../models/planet.interface";
import { Starship } from '../../models/starship.interface';
import { People } from '../../models/people.interface';
import { Params } from "@angular/router";

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
  topicList: TopicItem[]
  loader$: boolean = false

  private _listItems$ = new BehaviorSubject<TopicItem[]>([])
  private _item$ = new BehaviorSubject<People | Planet | Starship | null>(null)
  private _activeTopic$ = new BehaviorSubject<StarWarsTopic1>(StarWarsTopic1.People)
  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }

  constructor(private http: HttpClient) {
    this.activeTopic$
      .pipe(tap((topic: StarWarsTopic1) => {
        this.loadListItems(topic)
      }))
      .subscribe();
  }

  get activeTopic$(): Observable<StarWarsTopic1> {
    return this._activeTopic$.asObservable();
  }

  get listItems$(): Observable<TopicItem[]> {
    return this._listItems$.asObservable();
  }

  get item$(): Observable<People | Planet | Starship | null> {
    return this._item$.asObservable();
  }

  getListFromApi(topic: StarWarsTopic): Observable<TopicItem[]> {
    this.loader$ = true
    return this.http
      .get<TopicItem[]>(`${ this.baseUrls.tech }${ topic }`)
      .pipe(
        map((data: any) => {
            return data.results
          }
        )
      )
  }

  getSearchedItem(
    topic: StarWarsTopic,
    value: string
  ): Observable<People[] | Planet[] | Starship[]> {
    console.log(`${ this.baseUrls.dev }${ topic }/?search=${ value }`)
    return this.http
      .get<People[] | Planet[] | Starship[]>(`${ this.baseUrls.dev }${ topic }/?search=${ value }`)
      .pipe(
        map((data: any) => {
            return data.results
          }
        ),
        catchError(this.handleError)
      );
  }

  public loadListItem<T>(url: string): Observable<T | null> {
    return this.http
      .get<T>(url)
      .pipe(
        map((data: any) => {
            return data.result.properties
          }
        ),
        tap((item: T) => console.log(item))
      );

    return EMPTY;
  }

  public loadItemsByRoute(topic: StarWarsTopic1): Observable<TopicItem[]> {
    return this.loadListItems(topic)
      .pipe(
        tap((items: TopicItem[]) => this._listItems$.next(items))
      );
  }

  public loadListItemDetailById(uid: string) {
    const {url, ...rest} = this._listItems$.value.filter((item) => item.uid === uid)[0]
    this.loadListItem(url).pipe(
      tap((item: People | null) => console.log(item))
    ).subscribe();
    console.log(url)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${ error.status }, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private loadListItems(topic: StarWarsTopic1): Observable<TopicItem[]> {
    return this.getListFromApi(`/${ topic }` as StarWarsTopic)
  }
}
