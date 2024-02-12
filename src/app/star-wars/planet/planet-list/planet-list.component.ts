import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TopicItemInterface } from "../../topic-item.interface";

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // wird nächstes Mal behandelt
})
export class PlanetListComponent {
  @Input() planetList: TopicItemInterface[] | null;

  constructor() { }
}
