import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly errorMessage = new Subject<string>();
  errorMessage$ = this.errorMessage.asObservable();

  email = '';
  password = '';
  constructor(public auth: AuthService, private router: Router) {}

  loginWithEmailPassword(): void {
    this.auth
      .loginWithEmailPassword(this.email, this.password)
      .then(() => this.router.navigate(['/branches']))
      .catch(error => this.errorMessage.next(error.message));
  }

  logout(): void {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
