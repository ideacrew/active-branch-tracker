import firebase from 'firebase/compat/app';

export interface FSPullRequestReview {
  author: string;
  body: string;
  state: 'approved' | 'commented';
  submittedAt: firebase.firestore.Timestamp;
  url: string;
}
