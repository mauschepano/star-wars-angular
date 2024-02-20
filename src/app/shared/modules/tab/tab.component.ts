import { Component, OnInit } from '@angular/core';
import { TabService } from "./services/tab.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  public config: Observable<Record<string, string>[]> = this.tabService.config

  constructor(private tabService: TabService) {
  }

  ngOnInit() {
    this.tabService.init()
    console.log(this.config)
  }
}
