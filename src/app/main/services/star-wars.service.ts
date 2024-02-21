import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { map } from 'rxjs/operators'

import { TopicItem } from "../../models/topic-item.interface"
import { ExtendedEntity } from "../../models/extendedEntity.interface";

export enum StarWarsTopic {
  People = 'people', Planets = 'planets', Starships = 'starships',
}

export enum StarWarsSearch {
  People = 'luke', Planets = 'tatooine', Starships = 'CR90'
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private activeTopic: string = StarWarsTopic.People
  private baseUrls = 'https://swapi.dev/api'
  private _listItems$ = new BehaviorSubject<TopicItem[]>([])
  private _item$ = new BehaviorSubject<ExtendedEntity | null>(null)
  private _isLoading$: BehaviorSubject<any> = new BehaviorSubject(false)

  constructor(private http: HttpClient) {}

  get listItems$(): Observable<TopicItem[]> {
    return this._listItems$.asObservable();
  }

  get item$(): Observable<ExtendedEntity | null> {
    return this._item$.asObservable()
      .pipe(map((data) => {
        if (data) {
          return {...data, entityType: this.activeTopic} as ExtendedEntity
        }
        return null
      }))
  }

  get isLoading(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  public loadItemsByRoute(topic: StarWarsTopic): Observable<TopicItem[]> {
    this._isLoading$.next(true)
    return this.loadListItems(topic)
      .pipe(
        tap((items: TopicItem[]) => this._listItems$.next(items)),
        tap(() => this._isLoading$.next(false))
      );
  }

  public loadListItemDetailById(url: string) {
    this.loadListItem(url).pipe(
      tap((item: ExtendedEntity | null) => this._item$.next(item))
    ).subscribe();
  }

  public resetDetailState(): void {
    this._item$.next(null)
  }

  public loadSearchItemByForm(searchItem: string): void {
    const url = `${ this.baseUrls }/${ this.activeTopic }/?search=${ searchItem }&format=json`
    this.loadSearchItem(url).pipe(
      tap(() => this.resetDetailState()),
      tap((items: TopicItem[]) => this._listItems$.next(items))
    ).subscribe();
  }

  public setActiveTopic(topic: StarWarsTopic): void {
    this.activeTopic = topic
  }

  private loadSearchItem(url: string): Observable<TopicItem[]> {
    return this.http
      .get<ExtendedEntity>(url)
      .pipe(map((data: any) => data.results));
  }

  private loadListItems(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.getListFromApi(`/${ topic }` as StarWarsTopic)
  }

  private loadListItem(url: string): Observable<ExtendedEntity | null> {
    return this.http
      .get<ExtendedEntity>(url)
      .pipe(map((data: any) => data));
  }

  private getListFromApi(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.http
      .get<TopicItem[]>(`${ this.baseUrls }/${ topic }`)
      .pipe(map((data: any) => data.results))
  }
}
