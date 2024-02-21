import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { delay, Observable, share } from 'rxjs';
import { concatAll, switchMap, tap } from 'rxjs/operators';

import { StarWarsSearch, StarWarsService, StarWarsTopic } from "./services/star-wars.service";
import { TopicItem } from '../models/topic-item.interface';
import { ActivatedRoute, Params } from "@angular/router";
import { ExtendedEntity } from "../models/extendedEntity.interface";
import { showTimedLoader } from "../shared/operators/show-timed-loader.operator";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private LOADER_DELAY = 500;
  private TIME_AFTER_LOADER_DELAY = 1500;
  searchForm: FormGroup;
  subHeadline: StarWarsTopic = StarWarsTopic.People;
  defaultSearchItem: string = StarWarsSearch.People
  items$: Observable<TopicItem[]> = this.starWarsService.listItems$.pipe(
    share()
  );
  item$: Observable<ExtendedEntity | null> = this.starWarsService.item$;
  isLoading$: Observable<boolean> = this.items$.pipe(
    showTimedLoader(this.LOADER_DELAY, this.TIME_AFTER_LOADER_DELAY)
  )

  constructor(private starWarsService: StarWarsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.createSearchForm();
    this.registerOnRoutParameterChange().subscribe();
  }

  onSubmit() {
    const searchItem = this.searchForm.value.search

    this.starWarsService.loadSearchItemByForm(searchItem)
    this.searchForm.reset()
  }

  onDefaultSearch() {
    this.starWarsService.loadSearchItemByForm(this.defaultSearchItem)
  }

  public isFormControlValid(): boolean {
    const formControl = this.searchForm.get('search') as FormControl

    return formControl.valid
  }

  private registerOnRoutParameterChange(): Observable<any> {
    return this.route.params.pipe(
      tap((params: Params) => this.subHeadline = params['topic']),
      tap((params: Params) => this.starWarsService.setActiveTopic(params['topic'])),
      tap(() => this.starWarsService.resetDetailState()),
      switchMap((params: Params) => this.starWarsService.loadItemsByRoute(params['topic'])),
      tap((items: TopicItem[]) => this.defaultSearchItem = items[Math.floor(Math.random() * 10)].name),
      concatAll(),
    );
  }

  private createSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
