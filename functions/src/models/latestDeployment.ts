export interface LatestDeployment {
  branch: string;
  commit_sha: string;
  completed?: FirebaseFirestore.Timestamp;
  started?: FirebaseFirestore.Timestamp;
  repo: string;
  status: 'started' | 'completed';
  user_name: string;
}
