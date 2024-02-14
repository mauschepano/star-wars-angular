import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItem } from "../../models/topic-item.interface"
import { Planet } from "../../models/planet.interface";
import { Starship } from '../../models/starship.interface';
import { People } from '../../models/people.interface';

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
  private _item$ = new BehaviorSubject<People|Planet|Starship|TopicItem|null>(null)
  private _activeTopic$ = new BehaviorSubject<StarWarsTopic1>(StarWarsTopic1.People)
  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }
  private _headline$ = new BehaviorSubject<StarWarsTopic1>(StarWarsTopic1.People)

  constructor(private http: HttpClient) {
    this.activeTopic$
      .pipe(tap((topic: StarWarsTopic1) => {
        this.loadListItems(topic)
      }))
      .subscribe();
  }

  get headLine$(): Observable<StarWarsTopic1> {
    return this._headline$.asObservable();
  }

  get activeTopic$(): Observable<StarWarsTopic1> {
    console.log(this._activeTopic$)
    return this._activeTopic$.asObservable();
  }

  get listItems$(): Observable<TopicItem[]> {
    return this._listItems$.asObservable();
  }

  get item$(): Observable<People|Planet|Starship|TopicItem|null>{
    return this._item$.asObservable();
  }

  getListFromApi(topic: StarWarsTopic): Observable<TopicItem[]> {
    this.loader$ = true
    return this.http
      .get<TopicItem[]>(`${this.baseUrls.tech}${topic}`)
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

  public loadListItem(item: TopicItem): Observable<People|Planet|Starship|TopicItem> {
    if (item.hasOwnProperty('url')) {
      return this.http
        .get<People|Planet|Starship>(item.url!)
        .pipe(
          map((data: any) => {
              return data.result.properties
            }
          )
        );
    }

    return new BehaviorSubject(item);
  }

  public loadItemsByRoute(topic: StarWarsTopic1): Observable<TopicItem[]> {
    return this.loadListItems(topic).pipe(
        tap((items) => this._listItems$.next(items)),
        tap((items) => this._headline$.next(topic))
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
}
