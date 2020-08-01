export interface BranchDeploymentResponse {
  deployment: {
    payload: BranchDeployment;
  };
}

export interface BranchDeployment {
  branch: string;
  env: string;
  app: string;
  user_name: string;
  commit_sha: string;
  org: string;
  repo: string;
}
