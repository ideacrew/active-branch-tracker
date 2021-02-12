/* eslint-disable camelcase */
export interface BranchDeploymentPayload {
  app: string;
  branch: string;
  commit_sha: string;
  env: string;
  org: string;
  repo: string;
  status: 'started' | 'completed';
  user_name: string;
}
