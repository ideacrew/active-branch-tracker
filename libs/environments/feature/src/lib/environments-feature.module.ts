import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EnvironmentsDataAccessModule } from '@idc/environments/data-access';

import { OrgListComponent } from './org-list/org-list.component';
import { EnvironmentsListComponent } from './environments-list/environments-list.component';
import { EnvironmentCardComponent } from './environment-card/environment-card.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OrgListComponent },
      {
        path: ':orgId',
        pathMatch: 'full',
        component: EnvironmentsListComponent,
      },
    ]),
    EnvironmentsDataAccessModule,
  ],
  declarations: [OrgListComponent, EnvironmentsListComponent, EnvironmentCardComponent],
})
export class EnvironmentsFeatureModule {}
