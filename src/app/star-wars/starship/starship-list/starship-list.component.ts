import { Component, OnInit } from '@angular/core';
import { StarWarsService, StarWarsTopic } from "../../../services/star-wars.service";
import { TopicItemInterface } from "../../topic-item.interface";

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {
  starshipList: TopicItemInterface[]

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit() {
    this.initStarshipList()
  }

  initStarshipList (){
    this.starWarsService
      .getListFromApi(StarWarsTopic.Starships)
      .subscribe((starshipList) => {
        this.starshipList = starshipList
      })
  }
}
