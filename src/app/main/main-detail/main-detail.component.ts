import { Component, Input } from '@angular/core'

import { People } from "../../models/people.interface";
import { Planet } from "../../models/planet.interface";
import { Starship } from "../../models/starship.interface";
import { TopicItem } from "../../models/topic-item.interface";

@Component({
  selector:    'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls:   ['./main-detail.component.scss']
})
export class MainDetailComponent {
  @Input() item: People | Planet | Starship | TopicItem | null

  constructor() {}

  ngOnInit() {
    console.log(this.item);
  }
}
