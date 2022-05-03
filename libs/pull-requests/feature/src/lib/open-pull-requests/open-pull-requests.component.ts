import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FSPullRequest,
  PullRequestListService,
} from '@idc/pull-requests/data-access';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './open-pull-requests.component.html',
  styleUrls: ['./open-pull-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenPullRequestsComponent {
  pullRequests$: Observable<FSPullRequest[]> =
    this.prService.queryPullRequests();

  constructor(public prService: PullRequestListService) {}

  trackPrs(index: number, pr: FSPullRequest): number {
    return pr.number;
  }
}
