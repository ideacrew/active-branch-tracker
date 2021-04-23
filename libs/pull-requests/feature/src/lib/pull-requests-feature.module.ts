import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UtilModule } from '@idc/util';

import { PullRequestsListComponent } from './pull-requests-list/pull-requests-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PullRequestsListComponent },
    ]),
    UtilModule,
  ],
  declarations: [PullRequestsListComponent],
})
export class PullRequestsFeatureModule {}
