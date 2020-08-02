import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppFacade, AppActions, SidebarState } from '@idc/user-interface';

import { ServiceWorkerUpdateService } from './service-worker-update.service';

@Component({
  selector: 'idc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  SidebarState = SidebarState;
  constructor(
    public swUpdate: ServiceWorkerUpdateService,
    public appFacade: AppFacade,
  ) {}

  collapseSidebar(): void {
    this.appFacade.dispatch(AppActions.collapseSidebar());
  }

  expandSidebar(): void {
    this.appFacade.dispatch(AppActions.expandSidebar());
  }
}
