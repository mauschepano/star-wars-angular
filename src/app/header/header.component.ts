import { Component, Input } from '@angular/core'
import { StarWarsTopic } from "../main/services/star-wars.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() topics: StarWarsTopic[]

  constructor() {
  }

}
