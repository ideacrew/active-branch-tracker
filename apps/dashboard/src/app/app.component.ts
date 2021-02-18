import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@idc/auth';

import { ServiceWorkerUpdateService } from './service-worker-update.service';

@Component({
  selector: 'idc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    public swUpdate: ServiceWorkerUpdateService,
    public auth: AuthService,
  ) {}
}
