import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '../store/auth.facade';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'idc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(public authFacade: AuthFacade) {}

  ngOnInit(): void {}

  login(): void {
    this.authFacade.dispatch(AuthActions.login());
  }
  logout(): void {
    this.authFacade.dispatch(AuthActions.logout());
  }
}
