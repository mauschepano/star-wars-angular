import { Component, Input } from '@angular/core'

import { ExtendedEntity } from "../../../models/extendedEntity.interface";

@Component({
  selector: 'app-main-detail-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
})

export class StarshipComponent {
  @Input() item: ExtendedEntity

  constructor() {}
}
