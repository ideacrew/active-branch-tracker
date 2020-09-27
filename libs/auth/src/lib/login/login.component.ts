import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '../store/auth.facade';
import * as AuthActions from '../store/auth.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(public authFacade: AuthFacade) {}

  login(): void {
    this.authFacade.dispatch(AuthActions.login());
  }

  logout(): void {
    this.authFacade.dispatch(AuthActions.logout());
  }
}
