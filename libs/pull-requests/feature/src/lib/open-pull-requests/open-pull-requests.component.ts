import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FSPullRequest,
  PullRequestListService,
} from '@idc/pull-requests/data-access';
import { map, Observable } from 'rxjs';

import { PRByAuthor, PRByRepository } from '../models';
import { getPRsByAuthor, getPRsByRepository } from '../util';

interface PullRequestGraphs {
  prsByAuthor: PRByAuthor[];
  prsByRepository: PRByRepository[];
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
      map((prs: FSPullRequest[]) => {
        const mergedPRs: FSPullRequest[] = prs.filter(pr => pr.mergedAt);

        const prsByAuthor: PRByAuthor[] = getPRsByAuthor(mergedPRs);
        const prsByRepository: PRByRepository[] = getPRsByRepository(mergedPRs);
        console.log(prsByRepository);
        return { prsByAuthor, prsByRepository };
      }),
    );

  constructor(public prService: PullRequestListService) {}
}
