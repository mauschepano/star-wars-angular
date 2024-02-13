import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, switchMap, tap } from 'rxjs';

import { StarWarsService, StarWarsTopic, StarWarsTopic1 } from "../../services/star-wars.service";
import { TopicItemInterface } from '../topic-item.interface';
import { Planet } from "../planet/planet";
import { ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  searchForm: FormGroup;
  items$: Observable<TopicItemInterface[]> = this.starWarsService.planets$;

  constructor (private starWarsService: StarWarsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    });



    this.route.params.pipe(
      switchMap(this.starWarsService.loadItemsByRoute(params))
    ).subscribe()

    this.starWarsService.loadItemsByRoute().subscribe()
  }

  onSubmit (){
    console.log('submitted')
  }

}
