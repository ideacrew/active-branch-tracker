// eslint-disable-next-line import/no-unresolved
import { Timestamp } from 'firebase-admin/firestore';
import { FSPullRequestReview } from './firestore-pull-request-review';
import { Team } from './team';

export interface FSPullRequest {
  approvedAt?: Timestamp;
  approvedBy?: string;
  author: string;
  autoMergeEnabledAt?: Timestamp;
  autoMergeEnabledBy?: string;
  createdAt: Timestamp;
  mergedAt: Timestamp | null;
  mergedBy: string | null;
  number: number;
  reviews?: FSPullRequestReview[];
  title: string;
  url: string;
  stats?: {
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
  };
  branchName: string;
  targetBranch: string;
  team?: Team;
}
