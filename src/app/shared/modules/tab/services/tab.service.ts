import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, tap } from "rxjs";

import { Tab } from "../interfaces/tab.interface";

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private baseUrl: string = 'https://swapi.dev/api'

  private _config$: BehaviorSubject<never[]> = new BehaviorSubject([])
  private _tabs$: BehaviorSubject<Tab[]> = new BehaviorSubject([{name: '', isActive: false, onClick: () => {}}])

  constructor(private http: HttpClient) { }

  get config(): Observable<Record<string, string>[]> {
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

  private loadInitialEntities(): Observable<void> {
    return this.http
      .get(this.baseUrl).pipe(
        tap((data: any) => {
          if (data) {

            this._config$.next(data)
          }
        })
      );
  }

  private createTabs(record: Record<string, string>): void {
    const tabs: BehaviorSubject<Tab[]> = [];
    for (const [key, value] of Object.entries(record)) {
      this.createTab(key, value)
    }
  }

  private createTab(key: string, value: string): Tab {
    const tab: Tab = {
      name: key,
      isActive: false,
      onClick: () => { console.log('clicked')}
    }

    return tab;
  }
}
