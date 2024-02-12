import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { StarWarsService, StarWarsTopic } from "../../services/star-wars.service";
import { StarshipInterface } from "./starship-interface";

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent {
  @ViewChild('f') searchForm: NgForm
  resultList$: StarshipInterface[]

  constructor (private starWarsService: StarWarsService ) {}

  onSubmit (){
    this.starWarsService
      .getSearchedItem(StarWarsTopic.Starships, this.searchForm.value.search)
      .subscribe({
        next: (resultList) => {
          this.resultList$ = <StarshipInterface[]>resultList
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
