import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EnvironmentsDataAccessModule } from '@idc/environments/data-access';

import { OrgListComponent } from './org-list/org-list.component';
import { EnvironmentsListComponent } from './environments-list/environments-list.component';
import { EnvironmentCardComponent } from './environment-card/environment-card.component';
import { RelativeDatePipe } from './relative-date.pipe';
import { AutofocusInputDirective } from './autofocus-input.directive';
import { EnvironmentDetailComponent } from './environment-detail/environment-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OrgListComponent },
      {
        path: ':orgId/:envId',
        component: EnvironmentDetailComponent,
      },
      {
        path: ':orgId',
        component: EnvironmentsListComponent,
      },
    ]),
    EnvironmentsDataAccessModule,
  ],
  declarations: [
    OrgListComponent,
    EnvironmentsListComponent,
    EnvironmentCardComponent,
    RelativeDatePipe,
    AutofocusInputDirective,
    EnvironmentDetailComponent,
  ],
})
export class EnvironmentsFeatureModule {}
