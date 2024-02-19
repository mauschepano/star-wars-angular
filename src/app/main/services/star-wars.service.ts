import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  BehaviorSubject,
  Observable,
  tap,
  withLatestFrom
} from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItem } from "../../models/topic-item.interface"
import { ExtendedEntity } from "../../models/extendedEntity.interface";

export enum StarWarsTopic {
  People = 'people',
  Planets = 'planets',
  Starships = 'starships',
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  // topicList: TopicItem[]
  loader$: boolean = false

  private _listItems$ = new BehaviorSubject<TopicItem[]>([])
  private _item$ = new BehaviorSubject<ExtendedEntity | null>(null)
  private _activeTopic$ = new BehaviorSubject<StarWarsTopic>(StarWarsTopic.People)
  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }

  constructor(private http: HttpClient) {
    this.activeTopic$
      .pipe(tap((topic: StarWarsTopic) => {
        this.loadListItems(topic)
      }))
      .subscribe();
  }

  get activeTopic$(): Observable<StarWarsTopic> {
    return this._activeTopic$.asObservable();
  }

  get listItems$(): Observable<TopicItem[]> {
    return this._listItems$.asObservable();
  }

  get item$(): Observable<ExtendedEntity | null> {
    return this._item$.asObservable()
      .pipe(
        // withLatestFrom(this.activeTopic$),
        map((data: ExtendedEntity | null) => {
          // data?.entityType = this.activeTopic$
          console.log('##', data);
          return data
        })
      )
  }

  public loadItemsByRoute(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.loadListItems(topic)
      .pipe(
        tap((items: TopicItem[]) => this._listItems$.next(items))
      );
  }

  public loadListItemDetailById(uid: string) {
    const {url, ...rest} = this._listItems$.value.filter((item: TopicItem) => item.uid === uid)[0]
    this.loadListItem(url).pipe(
      tap((item: ExtendedEntity | null) => {
        // const entityType: StarWarsTopic = item?.url.includes('planet')
        //   ? StarWarsTopic.Planets
        //   : item?.url.includes('starship') ? StarWarsTopic.Starships : StarWarsTopic.People
        this._item$.next(item);
        // this._activeTopic$.next(entityType)
        // console.log(item);
      })
    ).subscribe();
  }

  public resetDetailState(): void {
    this._item$.next(null)
  }

  public setActiveTopic(topic: StarWarsTopic): void {
    this._activeTopic$.next(topic)
  }

  private loadListItems(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.getListFromApi(`/${ topic }` as StarWarsTopic)
  }

  private loadListItem(url: string): Observable<ExtendedEntity | null> {
    return this.http
      .get<ExtendedEntity>(url)
      .pipe(
        map((data: any) => {
            return data.result.properties
          }
        )
      );
  }

  private getListFromApi(topic: StarWarsTopic): Observable<TopicItem[]> {
    this.loader$ = true
    return this.http
      .get<TopicItem[]>(`${ this.baseUrls.tech }/${ topic }`)
      .pipe(
        map((data: any) => {
            return data.results
          }
        )
      )
  }
}
