import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StarWarsService, StarWarsTopic } from "../../services/star-wars.service";
import { Planet } from "./planet";
import { Observable } from 'rxjs';
import { TopicItemInterface } from '../topic-item.interface';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
})
export class PlanetComponent implements OnInit {
  searchForm: FormGroup;
  resultList: Planet[];
  planets$: Observable<TopicItemInterface[]> = this.starWarsService.planets$;
  constructor (private starWarsService: StarWarsService ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    });
    this.starWarsService.loadPlanetValues().subscribe();
  }

  onSubmit (){
    this.starWarsService
      .getSearchedItem(StarWarsTopic.Planets, this.searchForm.value.search)
      .subscribe({
        next: (resultList) => {
          this.resultList = resultList as Planet[];
          const p = this.resultList[0] as Planet;
          p.type = 'M';
        },
        error: () => {
          alert('Oops, something went wrong!')
          this.searchForm.reset()
        },
        complete: () => {
          this.searchForm.reset()
        }
      })
  }

}
