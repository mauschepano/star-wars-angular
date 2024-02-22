import { Component, Input } from '@angular/core';

import { Tab } from "../../interfaces/tab.interface";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() tab: Tab
}
