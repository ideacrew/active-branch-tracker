import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PullRequestsDataAccessModule } from '@idc/pull-requests/data-access';

import { OpenPullRequestsComponent } from './open-pull-requests/open-pull-requests.component';
import { PrGraphComponent } from './pr-graph/pr-graph.component';
import { RepoPrsComponent } from './repo-prs/repo-prs.component';
import { PrTimesComponent } from './pr-times/pr-times.component';
import { PrMergersComponent } from './pr-mergers/pr-merger.component';
import { PrsByDiffComponent } from './prs-by-diff/prs-by-diff.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OpenPullRequestsComponent },
    ]),
    PullRequestsDataAccessModule,
  ],
  declarations: [
    OpenPullRequestsComponent,
    PrGraphComponent,
    RepoPrsComponent,
    PrTimesComponent,
    PrMergersComponent,
    PrsByDiffComponent,
  ],
})
export class PullRequestsFeatureModule {}
