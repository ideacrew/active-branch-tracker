import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  declarations: [LoginComponent, UserComponent],
})
export class AuthModule {}
