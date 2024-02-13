import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, switchMap, tap } from 'rxjs';

import { StarWarsService, StarWarsTopic, StarWarsTopic1 } from "./services/star-wars.service";
import { TopicItemInterface } from '../models/topic-item.interface';
import { PlanetInterface } from "../models/planet.interface";
import { ActivatedRoute, Params } from "@angular/router";


@Component({
  selector:    'app-main',
  templateUrl: './main.component.html',
  styleUrls:   ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  searchForm: FormGroup;
  items$: Observable<TopicItemInterface[]> = this.starWarsService.listItems$;

  constructor (private starWarsService: StarWarsService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.createSearchForm();
    this.registerOnRoutParameterChange().subscribe();
  }
  onSubmit (){
    console.log('submitted')
  }

  private registerOnRoutParameterChange(): Observable<TopicItemInterface[]>{
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
