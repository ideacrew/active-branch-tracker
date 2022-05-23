import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentsService } from './environments.service';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

@NgModule({
  imports: [CommonModule, AngularFireFunctionsModule],
  providers: [EnvironmentsService],
})
export class EnvironmentsDataAccessModule {}
