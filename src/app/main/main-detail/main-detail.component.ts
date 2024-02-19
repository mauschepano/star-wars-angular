import { Component, Input, OnInit } from '@angular/core'

import { ExtendedEntity } from "../../models/extendedEntity.interface";
import { StarWarsTopic } from "../services/star-wars.service";

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss']
})
export class MainDetailComponent implements OnInit {
  @Input() item: ExtendedEntity | null

  constructor() {
  }

  ngOnInit() {
    console.log(this.item);
  }

  protected readonly StarWarsTopic = StarWarsTopic;
}
