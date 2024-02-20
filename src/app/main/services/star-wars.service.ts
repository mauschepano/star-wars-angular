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
  loader$: boolean = false

  private activeTopic: string = StarWarsTopic.People
  private baseUrls = {
    tech: 'https://www.swapi.dev/api',
    dev: 'https://swapi.dev/api'
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
        if (data) {
          return {...data, entityType: this.activeTopic} as ExtendedEntity
        }
        return null
      }))
  }

  public loadItemsByRoute(topic: StarWarsTopic): Observable<TopicItem[]> {
    return this.loadListItems(topic)
      .pipe(tap((items: TopicItem[]) => this._listItems$.next(items)));
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
    const url = `${ this.baseUrls.dev }/${ this.activeTopic }/?search=${ searchItem }&format=json`
    this.loadSearchItem(url).pipe(
      tap(() => this.resetDetailState()),
      tap((items: TopicItem[]) => this._listItems$.next(items))
    ).subscribe();
  }

  public setActiveTopic(topic: StarWarsTopic): void {
    this.activeTopic = topic
  }

  public getDefaultSearchItemByTopic(topic: StarWarsTopic): StarWarsSearch {
    switch (topic) {
      case StarWarsTopic.People:
        return StarWarsSearch.People
      case StarWarsTopic.Planets:
        return StarWarsSearch.Planets
      case StarWarsTopic.Starships:
        return StarWarsSearch.Starships
    }
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
    this.loader$ = true
    return this.http
      .get<TopicItem[]>(`${ this.baseUrls.dev }/${ topic }`)
      .pipe(map((data: any) => data.results))
  }
}
