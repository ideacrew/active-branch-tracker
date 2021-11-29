import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { EnvironmentService } from '@idc/environments/data-access';

@Component({
  selector: 'idc-edit-service-info',
  templateUrl: './edit-service-info.component.html',
  styleUrls: ['./edit-service-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditServiceInfoComponent {
  name = '';
  url = '';

  @Input() set service(service: EnvironmentService) {
    this.name = service.name;
    this.url = service.url;
  }

  @Output() readonly updateServiceInfo = new EventEmitter<{
    name: string;
    url: string;
  }>();

  updateInfo(): void {
    console.log('updateInfo');
    this.updateServiceInfo.emit({ name: this.name, url: this.url });
  }
}
