import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  declarations: [LoginComponent],
})
export class AuthModule {}
