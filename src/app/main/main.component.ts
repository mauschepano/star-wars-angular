import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, switchMap, tap } from 'rxjs';

import { StarWarsService } from "./services/star-wars.service";
import { TopicItem } from '../models/topic-item.interface';
import { ActivatedRoute, Params } from "@angular/router";
import { People } from "../models/people.interface";
import { Planet } from "../models/planet.interface";
import { Starship } from "../models/starship.interface";


@Component({
  selector:    'app-main',
  templateUrl: './main.component.html',
  styleUrls:   ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  searchForm: FormGroup;
  items$: Observable<TopicItem[]> = this.starWarsService.listItems$;
  item$: Observable<People|Planet|Starship|TopicItem|null> = this.starWarsService.item$;
  headline$: Observable<string> = this.starWarsService.headLine$;

  constructor (private starWarsService: StarWarsService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.createSearchForm();
    this.registerOnRoutParameterChange().subscribe();
  }
  onSubmit (){
    console.log('submitted')
  }

  private registerOnRoutParameterChange(): Observable<TopicItem[]>{
    return this.route.params.pipe(
        switchMap((params: Params) => this.starWarsService.loadItemsByRoute(params['topic']))
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
