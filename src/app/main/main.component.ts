import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { concatAll, switchMap, tap } from 'rxjs/operators';

import { StarWarsService } from "./services/star-wars.service";
import { TopicItem } from '../models/topic-item.interface';
import { ActivatedRoute, Params } from "@angular/router";
import { People } from "../models/people.interface";
import { Planet } from "../models/planet.interface";
import { Starship } from "../models/starship.interface";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  searchForm: FormGroup;
  items$: Observable<TopicItem[]> = this.starWarsService.listItems$;
  item$: Observable<People | Planet | Starship | null> = this.starWarsService.item$;
  subHeadline: string = 'People';

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
    // console.log(this.route.snapshot)
    // const observable = this.starWarsService.loadItemsByRoute(StarWarsTopic1.People)

    return this.route.params.pipe(
      tap((params: Params) => this.subHeadline = params['topic']),
      // tap((params: Params) => console.log('Params: ', params)),
      switchMap((params: Params) => this.starWarsService.loadItemsByRoute(params['topic'])),
      concatAll(),
      // tap((listItems: Params) => console.log('ListItems: ', listItems)),
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
