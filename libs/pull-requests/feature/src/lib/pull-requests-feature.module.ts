import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OpenPullRequestsComponent } from './open-pull-requests/open-pull-requests.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: OpenPullRequestsComponent },
    ]),
  ],
  declarations: [OpenPullRequestsComponent],
})
export class PullRequestsFeatureModule {}
