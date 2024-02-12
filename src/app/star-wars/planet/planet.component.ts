import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { StarWarsService, StarWarsTopic } from "../../services/star-wars.service";
import { PlanetInterface } from "./planet-interface";

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  searchForm: FormGroup;
  resultList$: PlanetInterface[]

  constructor (private starWarsService: StarWarsService ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit (){
    this.starWarsService
      .getSearchedItem(StarWarsTopic.Planets, this.searchForm.value.search)
      .subscribe({
        next: (resultList) => {
          this.resultList$ = <PlanetInterface[]>resultList
        },
        error: (error) => {
          alert('Oops, something went wrong!')
          this.searchForm.reset()
        },
        complete: () => {
          this.searchForm.reset()
        }
      })
  }
}
