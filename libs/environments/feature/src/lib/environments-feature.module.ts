import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EnvironmentsDataAccessModule } from '@idc/environments/data-access';
import { UtilModule } from '@idc/util';

import { OrgListComponent } from './org-list/org-list.component';
import { EnvironmentsListComponent } from './environments-list/environments-list.component';
import { EnvironmentCardComponent } from './environment-card/environment-card.component';
import { AutofocusInputDirective } from './autofocus-input.directive';
import { EnvironmentDetailComponent } from './environment-detail/environment-detail.component';
import { OrgAccessGuard } from './org-access.guard';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { EditServiceInfoComponent } from './edit-service-info/edit-service-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OrgListComponent },
      {
        path: ':orgId/:envId/:serviceId',
        component: ServiceDetailComponent,
        canActivate: [OrgAccessGuard],
      },
      {
        path: ':orgId/:envId',
        component: EnvironmentDetailComponent,
        canActivate: [OrgAccessGuard],
      },
      {
        path: ':orgId',
        component: EnvironmentsListComponent,
        canActivate: [OrgAccessGuard],
      },
    ]),
    EnvironmentsDataAccessModule,
    UtilModule,
  ],
  declarations: [
    OrgListComponent,
    EnvironmentsListComponent,
    EnvironmentCardComponent,
    AutofocusInputDirective,
    EnvironmentDetailComponent,
    LoadingSpinnerComponent,
    ServiceCardComponent,
    ServiceDetailComponent,
    EditServiceInfoComponent,
  ],
})
export class EnvironmentsFeatureModule {}
