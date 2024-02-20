import { Component, Input } from '@angular/core'

import { ExtendedEntity } from "../../../models/extendedEntity.interface";

@Component({
  selector: 'app-main-detail-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
})

export class PlanetComponent {
  @Input() item: ExtendedEntity

  constructor() {}
}
