import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { EnvironmentsService } from './environments.service';

@NgModule({
  imports: [CommonModule, AngularFireFunctionsModule],
  providers: [EnvironmentsService],
})
export class EnvironmentsDataAccessModule {}
