/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FSPullRequest } from '@idc/pull-requests/data-access';
import { differenceInBusinessDays } from 'date-fns';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'idc-pr-stats',
  templateUrl: './pr-stats.component.html',
  styleUrls: ['./pr-stats.component.scss'],
})
export class PrStatsComponent {
  @Input() prs!: FSPullRequest[];

  get oldestPrDate(): Date {
    return this.prs[this.prs.length - 1].createdAt.toDate();
  }

  get numberOfBusinessDaysSinceOldestPr(): number {
    return differenceInBusinessDays(new Date(), this.oldestPrDate);
  }

  get largestPullRequest(): FSPullRequest {
    const prsWithStats = this.prs.filter(pr => pr.stats);

    const [largestPullRequest] = prsWithStats.sort((a, b) => {
      const aStats = a.stats || { changed_files: 0 };
      const bStats = b.stats || { changed_files: 0 };
      return bStats.changed_files - aStats.changed_files;
    });

    return largestPullRequest;
  }

  get smallestPullRequest(): FSPullRequest {
    const prsWithStats = this.prs.filter(pr => pr.stats);
    const [smallestPullRequest] = prsWithStats.sort((a, b) => {
      const aStats = a.stats || { changed_files: 0 };
      const bStats = b.stats || { changed_files: 0 };
      return aStats.changed_files - bStats.changed_files;
    });

    return smallestPullRequest;
  }

  get shortestTimeBetweenCreationAndMerge(): FSPullRequest {
    const prsWithMergedAt = this.prs.filter(pr => pr.mergedAt);
    const [shortestTimeBetweenCreationAndMerge] = prsWithMergedAt.sort(
      (a, b) => {
        const aMergedAt = a.mergedAt || { seconds: 0 };
        const bMergedAt = b.mergedAt || { seconds: 0 };
        return (
          aMergedAt.seconds -
          a.createdAt.seconds -
          (bMergedAt.seconds - b.createdAt.seconds)
        );
      },
    );

    return shortestTimeBetweenCreationAndMerge;
  }
  get longestTimeBetweenCreationAndMerge(): FSPullRequest {
    const prsWithMergedAt = this.prs.filter(pr => pr.mergedAt);
    const [longestTimeBetweenCreationAndMerge] = prsWithMergedAt.sort(
      (a, b) => {
        const aMergedAt = a.mergedAt || { seconds: 0 };
        const bMergedAt = b.mergedAt || { seconds: 0 };
        return (
          bMergedAt.seconds -
          b.createdAt.seconds -
          (aMergedAt.seconds - a.createdAt.seconds)
        );
      },
    );

    return longestTimeBetweenCreationAndMerge;
  }

  get cumulativeLinesOfCodeChanged(): number {
    // eslint-disable-next-line unicorn/no-array-reduce
    return this.prs.reduce((accumulator, pr) => {
      const stats = pr.stats || { additions: 0, deletions: 0 };
      return accumulator + (stats.additions - stats.deletions);
    }, 0);
  }

  get cumulativeStats(): { additions: number; deletions: number } {
    // eslint-disable-next-line unicorn/no-array-reduce
    return this.prs.reduce(
      (accumulator, pr) => {
        const stats = pr.stats || { additions: 0, deletions: 0 };
        return {
          additions: accumulator.additions + stats.additions,
          deletions: accumulator.deletions + stats.deletions,
        };
      },
      { additions: 0, deletions: 0 },
    );
  }

  get linesOfCodeChangedPerBusinessDay(): number {
    return Math.floor(
      this.cumulativeLinesOfCodeChanged /
        this.numberOfBusinessDaysSinceOldestPr,
    );
  }
}
