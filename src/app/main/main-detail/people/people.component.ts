import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core'

import { ExtendedEntity } from "../../../models/extendedEntity.interface";

@Component({
  selector: 'app-main-detail-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PeopleComponent {
  @Input() item: ExtendedEntity

  constructor(private cdr: ChangeDetectorRef) {}
}
