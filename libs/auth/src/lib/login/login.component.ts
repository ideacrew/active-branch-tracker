import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserFacade } from '../store/user.facade';
import * as UserActions from '../store/user.actions';

@Component({
  selector: 'idc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(public userFacade: UserFacade) {}

  ngOnInit(): void {}

  login(): void {
    this.userFacade.dispatch(UserActions.login());
  }
  logout(): void {
    this.userFacade.dispatch(UserActions.logout());
  }
}
