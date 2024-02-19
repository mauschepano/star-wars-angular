import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { concatAll, switchMap, tap } from 'rxjs/operators';

import { StarWarsService, StarWarsTopic } from "./services/star-wars.service";
import { TopicItem } from '../models/topic-item.interface';
import { ActivatedRoute, Params } from "@angular/router";
import { ExtendedEntity } from "../models/extendedEntity.interface";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  searchForm: FormGroup;
  items$: Observable<TopicItem[]> = this.starWarsService.listItems$;
  item$: Observable<ExtendedEntity | null> = this.starWarsService.item$;
  subHeadline: StarWarsTopic = StarWarsTopic.People;

  constructor(private starWarsService: StarWarsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.createSearchForm();
    this.registerOnRoutParameterChange().subscribe();
  }

  onSubmit() {
    console.log('submitted')
  }

  public handleListItemClicked(item: TopicItem) {
    console.log(item);
  }

  private registerOnRoutParameterChange(): Observable<any> {
    return this.route.params.pipe(
      tap((params: Params) => this.subHeadline = params['topic']),
      tap(() => this.starWarsService.resetDetailState()),
      switchMap((params: Params) => this.starWarsService.loadItemsByRoute(params['topic'])),
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
