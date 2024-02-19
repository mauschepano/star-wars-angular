import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  BehaviorSubject, Observable, tap, withLatestFrom
} from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItem } from "../../models/topic-item.interface"
import { ExtendedEntity } from "../../models/extendedEntity.interface";

export enum StarWarsTopic {
  People = 'people', Planets = 'planets', Starships = 'starships',
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  loader$: boolean = false

  private activeTopic: string = StarWarsTopic.People
  private baseUrls = {
    tech: 'https://www.swapi.tech/api',
    dev: 'https://www.swapi.dev/api'
  }
  private _listItems$ = new BehaviorSubject<TopicItem[]>([])
  private _item$ = new BehaviorSubject<ExtendedEntity | null>(null)

  constructor(private http: HttpClient) {}

  get listItems$(): Observable<TopicItem[]> {
    return this._listItems$.asObservable();
  }

  get item$(): Observable<ExtendedEntity | null> {
    return this._item$.asObservable()
      .pipe(map((data) => {
        return {...data, entityType: this.activeTopic} as ExtendedEntity
      }))
  }

  public loadItemsByRoute(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.loadListItems(topic)
      .pipe(tap((items: TopicItem[]) => this._listItems$.next(items)));
  }

  public loadListItemDetailById(uid: string) {
    const {url, ...rest} = this._listItems$.value.filter((item: TopicItem) => item.uid === uid)[0]
    this.loadListItem(url).pipe(tap((item: ExtendedEntity | null) => this._item$.next(item))).subscribe();
  }

  public resetDetailState(): void {
    this._item$.next(null)
  }

  private loadListItems(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.getListFromApi(`/${ topic }` as StarWarsTopic)
  }

  private loadListItem(url: string): Observable<ExtendedEntity | null> {
    return this.http
      .get<ExtendedEntity>(url)
      .pipe(map((data: any) => data.result.properties));
  }

  private getListFromApi(topic: StarWarsTopic): Observable<TopicItem[]> {
    this.loader$ = true
    return this.http
      .get<TopicItem[]>(`${ this.baseUrls.tech }/${ topic }`)
      .pipe(map((data: any) => data.results))
  }
}
