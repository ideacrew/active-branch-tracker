import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  PullRequestsService,
  PullRequest,
} from '@idc/pull-requests/data-access';

@Component({
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PullRequestsListComponent {
  pullRequests$: Observable<PullRequest[]> = this.prService.sortedPullRequests$;

  constructor(private prService: PullRequestsService) {}
}
