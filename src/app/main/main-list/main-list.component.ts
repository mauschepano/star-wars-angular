import { Component, Input } from '@angular/core'
import { TopicItemInterface } from "../../models/topic-item.interface";

@Component({
  selector:    'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls:   ['./main-list.component.scss']
})
export class MainListComponent {
  @Input() itemList: TopicItemInterface[] | null

  constructor() { }
}
