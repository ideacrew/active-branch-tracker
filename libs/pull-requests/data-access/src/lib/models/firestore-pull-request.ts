import firebase from 'firebase/compat/app';

import { FSPullRequestReview } from './firestore-pull-request-review';

export interface FSPullRequest {
  approvedAt?: firebase.firestore.Timestamp;
  approvedBy?: string;
  author: string;
  autoMergeEnabledAt?: firebase.firestore.Timestamp;
  autoMergeEnabledBy?: string;
  createdAt: firebase.firestore.Timestamp;
  mergedAt?: firebase.firestore.Timestamp;
  mergedBy?: string;
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
