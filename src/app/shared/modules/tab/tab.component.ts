import { Component, OnInit } from '@angular/core';
import { TabService } from "./services/tab.service";
import { Observable, skip } from "rxjs";
import { tap } from 'rxjs/operators';
import { Tab } from './interfaces/tab.interface';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  public config$: Observable<Record<string, string>> = this.tabService.config.pipe(
      skip(1),
      tap((v) => {
        console.log(v);
        this.createTabs(v);
      })
  );
  public tabs: Tab[] = [];

  constructor(private tabService: TabService) {
  }

  ngOnInit() {
    this.tabService.init()
  }

  private createTabs(record: Record<string, string>): void {
    const tabs: Tab[] = [];
    for (const [key, value] of Object.entries(record)) {
      tabs.push(this.createTab(key, value, this.logger.bind(this, key)))
    }
    this.tabs = tabs;
    console.log(this.tabs);
  }

  logger(key: string){
    switch (key) {
      case 'planets': {
        this.loggerOfPlanets();
        break;
      }
      case 'starships': {
        this.loggerOfStarships();
        break;
      }
      default: {
        this.loggerOfPeople()
      }
    }
  }

  loggerOfPlanets(str?: string){
    console.log('logger of Planets');
  }
  loggerOfStarships(str?: string){
    console.log('logger of Starships');
  }
  loggerOfPeople(str?: string){
    console.log('logger of People');
  }

  public createTab(key: string, value: string, cb: any): Tab {
    const tab: Tab = {
      name: key,
      isActive: false,
      onClick: cb
    }

    return tab;
  }
}
