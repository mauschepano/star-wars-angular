import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { TopicItem } from "../../models/topic-item.interface";
import { StarWarsService } from "../services/star-wars.service";

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnChanges {
  @Input() itemList: TopicItem[] | null

  // @Output() listItemClicked: EventEmitter<TopicItem> = new EventEmitter<TopicItem>()

  constructor(private starWarsService: StarWarsService, private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemList'].currentValue !== changes['itemList'].previousValue) {
      this.cdr.detectChanges()
      console.log(changes)
    }
  }

  selectItem(item: TopicItem) {
    // this.listItemClicked.emit(item)
    this.starWarsService.loadListItemDetailById(item.uid)
  }
}
