import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'

import { ExtendedEntity } from "../../../models/extendedEntity.interface";
import { StarWarsTopic } from "../../services/star-wars.service";

@Component({
  selector: 'app-main-detail-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StarshipComponent implements OnChanges {
  @Input() item: ExtendedEntity

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const {currentValue, previousValue, firstChange} = changes['item'];
    if (currentValue !== previousValue) {
      this.cdr.detectChanges();
    }
  }

  protected readonly StarWarsTopic = StarWarsTopic;
}
