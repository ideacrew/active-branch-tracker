import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  FSPullRequest,
  PullRequestListService,
} from '@idc/pull-requests/data-access';
import { map, Observable } from 'rxjs';

import { PRByAuthor, PRByRepository, PullRequestWithTime } from '../models';
import {
  getPRsByAuthor,
  getPRsByRepository,
  getPRsByTime,
  groupPRsByMergeTime,
  PullRequestsByMergeTime,
} from '../util';

interface PullRequestGraphs {
  prsByAuthor: PRByAuthor[];
  prsByRepository: PRByRepository[];
  prsByMergeTime: PullRequestsByMergeTime[];
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

        return { prsByAuthor, prsByRepository, prsByMergeTime };
      }),
    );

  constructor(public prService: PullRequestListService) {}
}
