import { Component, Input } from '@angular/core'
import { TopicItem } from "../../models/topic-item.interface";
import { StarWarsService } from "../services/star-wars.service";

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent {
  @Input() itemList: TopicItem[] | null

  // @Output() listItemClicked: EventEmitter<TopicItem> = new EventEmitter<TopicItem>()

  constructor(private starWarsService: StarWarsService) {
  }

  selectItem(item: TopicItem) {
    // this.listItemClicked.emit(item)
    this.starWarsService.loadListItemDetailById(item.uid)
  }
}
