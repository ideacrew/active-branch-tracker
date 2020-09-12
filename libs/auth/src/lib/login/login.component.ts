import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'idc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    this.auth.login();
  }
  logout(): void {
    this.auth.logout();
  }
}
