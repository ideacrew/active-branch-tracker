export interface LatestDeployment {
  app: string;
  branch: string;
  commit_sha: string;
  completed?: firebase.default.firestore.Timestamp;
  env: string;
  org: string;
  repo: string;
  started?: firebase.default.firestore.Timestamp;
  status: 'started' | 'completed';
  user_name: string;
}
