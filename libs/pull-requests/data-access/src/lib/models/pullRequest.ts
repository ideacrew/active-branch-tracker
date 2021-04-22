export interface PullRequest {
  additions: number;
  branchName: string; // pull_request.head.ref
  changedFiles: number;
  commits: number;
  deletions: number;
  // eslint-disable-next-line id-blacklist
  number: number;
  organizationName: string;
  repositoryName: string;
  targetBranchName: string; // pull_request.base.ref
  userName: string; // pull_request.user.login

  createdAt: firebase.default.firestore.Timestamp;
  updatedAt: firebase.default.firestore.Timestamp;

  merged: boolean;
  closed: boolean;
}
