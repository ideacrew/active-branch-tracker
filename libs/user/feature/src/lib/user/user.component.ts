import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade, logout } from '@idc/auth';

import { UserFacade } from '@idc/user/data-access';

@Component({

  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent  {
  constructor(public userFacade: UserFacade, private authFacade: AuthFacade) {}

  logout(): void {
    this.authFacade.dispatch(logout());
  }
}
