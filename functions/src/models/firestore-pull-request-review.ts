import { firestore } from 'firebase-admin';

export interface FSPullRequestReview {
  author: string;
  body: string;
  state: 'approved' | 'commented';
  submittedAt: firestore.Timestamp;
  url: string;
}
