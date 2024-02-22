import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabConfigComponent } from './tab-config.component';
import { RouterLink } from "@angular/router";
import { TabComponent } from "./components/tab/tab.component";


@NgModule({
  declarations: [
    TabConfigComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    TabConfigComponent
  ]
})
export class TabModule {}
