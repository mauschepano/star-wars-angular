import { Component, OnInit } from '@angular/core';
import { TabService } from "./services/tab.service";
import { Observable, skip } from "rxjs";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  public config$: Observable<Record<string, string>[]> = this.tabService.config.pipe(
      skip(1),
      tap((v) => {
        console.log(v);
      })
  )

  constructor(private tabService: TabService) {
  }

  ngOnInit() {
    this.tabService.init()
  }
}
