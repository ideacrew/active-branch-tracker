import firebase from 'firebase/compat/app';

export interface LatestDeployment {
  app: string;
  branch: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  commit_sha: string;
  completed?: firebase.firestore.Timestamp;
  env: string;
  org: string;
  repo: string;
  started?: firebase.firestore.Timestamp;
  status: 'started' | 'completed';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_name: string;
}
