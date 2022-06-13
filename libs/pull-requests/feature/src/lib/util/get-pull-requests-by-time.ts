import { FSPullRequest } from '@idc/pull-requests/data-access';

import { PullRequestWithTime } from '../models';

export interface PullRequestsByMergeTime {
  timeToMergeInDays: number; // in days
  mergedPRs: FSPullRequest[];
  quantity: number;
}

export const getPRsByTime = (
  mergedPRs: FSPullRequest[],
): PullRequestWithTime[] => {
  const prsWithTime: PullRequestWithTime[] = mergedPRs.map(pr => {
    // Time to merge in ms
    const timeToMergeInMS = Math.ceil(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pr.mergedAt!.toMillis() - pr.createdAt.toMillis(),
    );

    const timeToMergeInDays = Math.ceil(
      timeToMergeInMS / (1000 * 60 * 60 * 24),
    );

    return { ...pr, timeToMerge: timeToMergeInDays };
  });

  return prsWithTime;
};

export const groupPRsByMergeTime = (
  prs: PullRequestWithTime[],
): PullRequestsByMergeTime[] => {
  const times = prs.map(pr => pr.timeToMerge);
  const uniqueTimes = [...new Set(times)];

  const prsByTime: PullRequestsByMergeTime[] = uniqueTimes.map(time => {
    const timedPrs: PullRequestWithTime[] = prs.filter(
      pr => pr.timeToMerge === time,
    );

    return {
      timeToMergeInDays: time,
      mergedPRs: timedPrs,
      quantity: timedPrs.length,
    };
  });

  const sorted = prsByTime.sort((a, b) =>
    a.mergedPRs.length > b.mergedPRs.length ? -1 : 1,
  );

  return sorted;
};
