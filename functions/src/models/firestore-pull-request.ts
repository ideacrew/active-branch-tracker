import { firestore } from 'firebase-admin';
import { FSPullRequestReview } from './firestore-pull-request-review';

export interface FSPullRequest {
  approvedAt?: firestore.Timestamp;
  approvedBy?: string;
  author: string;
  autoMergeEnabledAt?: firestore.Timestamp;
  autoMergeEnabledBy?: string;
  createdAt: firestore.Timestamp;
  mergedAt: firestore.Timestamp | null;
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
}
