import { FSPullRequest } from '@idc/pull-requests/data-access';

export interface PullRequestWithTime extends FSPullRequest {
  timeToMerge: number; // in days
  timeToReview?: number;
}
