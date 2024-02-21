import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, tap } from "rxjs";

import { Tab } from "../interfaces/tab.interface";

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private baseUrl: string = 'https://swapi.dev/api'

  private _config$: BehaviorSubject<Record<string, string>> = new BehaviorSubject({})

  constructor(private http: HttpClient) { }

  get config(): Observable<Record<string, string>> {
    return this._config$.asObservable();
  }

  public init() {
    this.loadInitialEntities().subscribe();
  }

  // public loadSearchItemByForm(searchItem: string): void {
  //   const url = `${ this.baseUrls }/${ this.activeTopic }/?search=${ searchItem }&format=json`
  //   this.loadSearchItem(url).pipe(
  //     tap(() => this.resetDetailState()),
  //     tap((items: TopicItem[]) => this._listItems$.next(items))
  //   ).subscribe();
  // }

  private loadInitialEntities(): Observable<Object> {
    return this.http
      .get(this.baseUrl).pipe(
        tap((data: Object) => {
          if (data) {
            this._config$.next(data as Record<string, string>);
          }
        })
      );
  }
}
