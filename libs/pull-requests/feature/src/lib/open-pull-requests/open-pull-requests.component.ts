import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FSPullRequest,
  PullRequestListService,
} from '@idc/pull-requests/data-access';
import { map, Observable } from 'rxjs';

export interface PRByAuthor {
  author: string;
  mergedPRs: FSPullRequest[];
  quantity: number;
}

@Component({
  templateUrl: './open-pull-requests.component.html',
  styleUrls: ['./open-pull-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenPullRequestsComponent {
  pullRequests$: Observable<PRByAuthor[]> = this.prService
    .queryPullRequests()
    .pipe(
      map((prs: FSPullRequest[]) => {
        const mergedPRs: FSPullRequest[] = prs.filter(pr => pr.mergedAt);

        const prsByAuthor: PRByAuthor[] = getPRsByAuthor(mergedPRs);

        return prsByAuthor;
      }),
    );

  constructor(public prService: PullRequestListService) {}

  trackPrs(index: number, pr: PRByAuthor): string {
    return pr.author;
  }
}

const getPRsByAuthor = (mergedPRs: FSPullRequest[]): PRByAuthor[] => {
  const authors: string[] = mergedPRs.map(pr => pr.author);
  const uniqueAuthors: string[] = [...new Set(authors)];

  const authoredPRs = uniqueAuthors.map(author => {
    const authorPRs: FSPullRequest[] = mergedPRs.filter(
      pr => pr.author === author,
    );

    return {
      author,
      mergedPRs: authorPRs,
      quantity: authorPRs.length,
    };
  });

  const sorted = authoredPRs.sort((a, b) => {
    return a.mergedPRs.length > b.mergedPRs.length ? -1 : 1;
  });

  return sorted;
};
