import { Component, Input, OnInit } from '@angular/core'

import { ExtendedEntity } from "../../models/extendedEntity.interface";

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
}
