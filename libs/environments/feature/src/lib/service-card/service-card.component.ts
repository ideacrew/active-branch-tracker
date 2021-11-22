import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EnvironmentService } from '@idc/environments/data-access';

@Component({
  selector: 'idc-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  @Input() service!: EnvironmentService;

  //   @HostBinding('class.reachable') get isReachable(): boolean {
  //     return this.service.reachable !== undefined ? this.service.reachable : true;
  //   }
}
