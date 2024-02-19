import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'

import { ExtendedEntity } from "../../models/extendedEntity.interface";
import { StarWarsTopic } from "../services/star-wars.service";

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainDetailComponent implements OnInit, OnChanges {
  @Input() item: ExtendedEntity | null

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const {currentValue, previousValue, firstChange} = changes['item'];
    if (currentValue !== previousValue) {
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    console.log(this.item);
  }

  protected readonly StarWarsTopic = StarWarsTopic;
}
