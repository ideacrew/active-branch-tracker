import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FSPullRequest,
  PullRequestListService,
} from '@idc/pull-requests/data-access';
import { map, Observable } from 'rxjs';

import {
  PRByAuthor,
  PRByFilesChanged,
  PRByRepository,
  PullRequestWithTime,
} from '../models';
import {
  getPRsByApprover,
  getPRsByAuthor,
  getPRsByFilesChanged,
  getPRsByRepository,
  getPRsByTime,
  groupPRsByMergeTime,
  PullRequestsByMergeTime,
} from '../util';

interface PullRequestGraphs {
  prsByAuthor: PRByAuthor[];
  prsByRepository: PRByRepository[];
  prsByMergeTime: PullRequestsByMergeTime[];
  prsByMerger: PRByAuthor[];
  mergedPRs: FSPullRequest[];
  prsByFilesChanged: PRByFilesChanged[];
}

@Component({
  templateUrl: './open-pull-requests.component.html',
  styleUrls: ['./open-pull-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenPullRequestsComponent {
  pullRequests$: Observable<PullRequestGraphs> = this.prService
    .queryPullRequests()
    .pipe(
      map((prs: FSPullRequest[]): PullRequestGraphs => {
        // Only pull in merged PRs to start
        const mergedPRs: FSPullRequest[] = prs.filter(pr => pr.mergedAt);
        const prsWithTime: PullRequestWithTime[] = getPRsByTime(mergedPRs);

        // Split up PRs by author and repository
        const prsByAuthor: PRByAuthor[] = getPRsByAuthor(prsWithTime);
        const prsByRepository: PRByRepository[] =
          getPRsByRepository(prsWithTime);
        const prsByMergeTime: PullRequestsByMergeTime[] =
          groupPRsByMergeTime(prsWithTime);
        const prsByMerger: PRByAuthor[] = getPRsByApprover(prsWithTime);
        const prsByFilesChanged: PRByFilesChanged[] =
          getPRsByFilesChanged(mergedPRs);

        return {
          mergedPRs,
          prsByAuthor,
          prsByRepository,
          prsByMergeTime,
          prsByMerger,
          prsByFilesChanged,
        };
      }),
    );

  constructor(public prService: PullRequestListService) {}
}
