import { Component } from '@angular/core'

import { StarWarsTopic } from "./main/services/star-wars.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  topics: StarWarsTopic[] = [
    StarWarsTopic.People,
    StarWarsTopic.Planets,
    StarWarsTopic.Starships
  ]
}
