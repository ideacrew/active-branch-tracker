import firebase from 'firebase/compat/app';

import { FSPullRequestReview } from './firestore-pull-request-review';
import { Team } from './team';

export interface FSPullRequest {
  approvedAt?: firebase.firestore.Timestamp;
  approvedBy?: string;
  author: string;
  autoMergeEnabledAt?: firebase.firestore.Timestamp;
  autoMergeEnabledBy?: string;
  createdAt: firebase.firestore.Timestamp;
  mergedAt?: firebase.firestore.Timestamp;
  mergedBy?: string;
  // eslint-disable-next-line id-blacklist
  number: number;
  reviews?: FSPullRequestReview[];
  title: string;
  url: string;
  stats?: {
    commits: number;
    additions: number;
    deletions: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    changed_files: number;
  };
  branchName: string;
  targetBranch: string;
  team?: Team;
}
