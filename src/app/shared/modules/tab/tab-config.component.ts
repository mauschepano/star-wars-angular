import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TabService } from "./services/tab.service";
import { Observable, skip } from "rxjs";
import { tap } from 'rxjs/operators';
import { Tab } from './interfaces/tab.interface';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-config.component.html',
})
export class TabConfigComponent implements OnInit {
  @Output() public tabClicked: EventEmitter<string> = new EventEmitter();

  public config$: Observable<Record<string, string>> = this.tabService.config.pipe(
    skip(1),
    tap((v) => {
      console.log(v);
      this.createTabs(v);
    })
  );
  public tabs: Tab[] = [];

  constructor(private tabService: TabService) {}

  ngOnInit() {
    this.tabService.init()
  }

  private createTabs(record: Record<string, string>): void {
    const tabs: Tab[] = [];
    for (const [key, value] of Object.entries(record)) {
      tabs.push(this.createTab(key, value, () => this.tabClicked.emit(value)))
    }
    this.tabs = tabs;
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
