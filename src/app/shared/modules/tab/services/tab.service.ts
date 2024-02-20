import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private baseUrl: string = 'https://swapi.dev/api'

  public _config$: BehaviorSubject<Record<string, string>[] | null> = new BehaviorSubject([])

  constructor(private http: HttpClient) { }

  get config(): BehaviorSubject<Record<string, string>[] | null> {
    return this._config$
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

  private loadInitialEntities(): Observable<Record<string, string>[] | null> {
    return this.http
      .get<Record<string, string>[] | null>(this.baseUrl).pipe(
        tap((data: any) => {
          if (!data) {
            return EMPTY
          }

          this._config$.next(data)
        })
      );
  }
}
