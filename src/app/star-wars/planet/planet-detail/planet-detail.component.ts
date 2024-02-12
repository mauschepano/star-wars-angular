import { Component, OnInit } from '@angular/core';
import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service";
import { ActivatedRoute, Params } from "@angular/router";
import { PlanetInterface } from "../planet-interface";
import { PeopleInterface } from "../../people/people.interface";

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {
  id: string
  planet: PlanetInterface
  loading = true

  constructor (
    private starWarsService: StarWarsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.loading = true
        this.id = params['id']
        this.starWarsService
          .getListItem(StarWarsTopic.Planets, this.id)
          .subscribe((planet) => {
            this.planet = <PlanetInterface>planet
            this.loading = false
          })
      })
  }
}
