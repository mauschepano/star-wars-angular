import { Component, Input } from '@angular/core'
import { TopicItem } from "../../models/topic-item.interface";
import { StarWarsService } from "../services/star-wars.service";

@Component({
  selector:    'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls:   ['./main-list.component.scss']
})
export class MainListComponent {
  @Input() itemList: TopicItem[] | null

  constructor(private starWarsService: StarWarsService) { }

  selectItem(item: TopicItem) {
    console.log(item);
    this.starWarsService.loadListItem(item)
  }
}
