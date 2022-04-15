import { firestore } from 'firebase-admin';
import { FSPullRequestReview } from './firestore-pull-request-review';

export interface FSPullRequest {
  approvedAt?: firestore.Timestamp;
  approvedBy?: string;
  author: string;
  autoMergeEnabled: boolean;
  createdAt: firestore.Timestamp;
  mergedAt?: firestore.Timestamp;
  mergedBy?: string;
  number: number;
  reviews?: FSPullRequestReview[];
  title: string;
  url: string;
}
