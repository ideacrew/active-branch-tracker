import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EnvironmentsDataAccessModule } from '@idc/environments/data-access';
import { EnvironmentsComponent } from './environments/environments.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EnvironmentsComponent },
    ]),
    EnvironmentsDataAccessModule,
  ],
  declarations: [EnvironmentsComponent],
})
export class EnvironmentsFeatureModule {}
