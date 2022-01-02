export interface PullRequestDocument {
  additions: number;
  branchName: string; // pull_request.head.ref
  changedFiles: number;
  commits: number;
  deletions: number;
  number: number;
  organizationName: string;
  repositoryName: string;
  targetBranchName: string; // pull_request.base.ref
  userName: string; // pull_request.user.login

  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;

  merged: boolean;
  closed: boolean;
  draft: boolean;
}
