import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { OrgEnvironment } from '@idc/environments/data-access';

@Component({
  selector: 'idc-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrls: ['./environment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentCardComponent implements OnInit {
  @Input() readonly environment: OrgEnvironment;

  constructor() {}

  ngOnInit(): void {}
}
