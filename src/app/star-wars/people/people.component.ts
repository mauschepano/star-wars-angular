import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StarWarsService, StarWarsTopic } from '../../services/star-wars.service';
import { PeopleInterface } from './people.interface';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  @ViewChild('f') searchForm: NgForm
  resultList$: PeopleInterface[]

  constructor (private starWarsService: StarWarsService ) {}

  onSubmit (){
    this.starWarsService
      .getSearchedItem(StarWarsTopic.People, this.searchForm.value.search)
      .subscribe({
        next: (resultList) => {
          this.resultList$ = <PeopleInterface[]>resultList
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
