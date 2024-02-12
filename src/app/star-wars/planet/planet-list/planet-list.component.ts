import { Component, OnInit } from '@angular/core';
import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service";
import { TopicItemInterface } from "../../topic-item.interface";

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  planetList: TopicItemInterface[]

  constructor( private starWarsService: StarWarsService) { }

  ngOnInit() {
    this.initPlanetList()
  }

  initPlanetList() {
    this.starWarsService
      .getListFromApi(StarWarsTopic.Planets)
      .subscribe((planetList) => {
        this.planetList = planetList
      })
  }
}
