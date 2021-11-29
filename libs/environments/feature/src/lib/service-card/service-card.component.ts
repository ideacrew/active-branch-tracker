import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  EnvironmentService,
  OrgEnvironment,
} from '@idc/environments/data-access';

@Component({
  selector: 'idc-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  @Input() service!: EnvironmentService;
  @Input() environment!: OrgEnvironment;
  @Input() orgId!: string | null;

  //   @HostBinding('class.reachable') get isReachable(): boolean {
  //     return this.service.reachable !== undefined ? this.service.reachable : true;
  //   }
}
