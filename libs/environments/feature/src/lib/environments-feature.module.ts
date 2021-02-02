import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EnvironmentsDataAccessModule } from '@idc/environments/data-access';
import { EnvironmentsComponent } from './environments/environments.component';
import { OrgListComponent } from './org-list/org-list.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OrgListComponent },
    ]),
    EnvironmentsDataAccessModule,
  ],
  declarations: [EnvironmentsComponent, OrgListComponent],
})
export class EnvironmentsFeatureModule {}
