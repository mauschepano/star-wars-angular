import { Component, OnInit } from '@angular/core';
import { StarshipInterface } from "../starship-interface";
import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss']
})
export class StarshipDetailComponent implements OnInit {
  id: string
  starship: StarshipInterface
  loading = true


  constructor(
    private starWarsService: StarWarsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.loading = true
        this.id = params['id']
        this.starWarsService
          .getListItem(StarWarsTopic.Starships, this.id)
          .subscribe((starship) => {
            this.starship = <StarshipInterface>starship
            this.loading = false
          })
      })
  }
}
