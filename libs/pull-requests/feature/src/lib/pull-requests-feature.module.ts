import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PullRequestsDataAccessModule } from '@idc/pull-requests/data-access';

import { OpenPullRequestsComponent } from './open-pull-requests/open-pull-requests.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OpenPullRequestsComponent },
    ]),
    PullRequestsDataAccessModule,
  ],
  declarations: [OpenPullRequestsComponent],
})
export class PullRequestsFeatureModule {}
