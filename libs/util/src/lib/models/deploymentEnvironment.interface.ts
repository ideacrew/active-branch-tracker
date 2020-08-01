import { EnvironmentStatus } from './environmentStatus.enum';

export interface BranchDeployment {
  branch: string;
  env: string;
  app: string;
  user_name: string;
  commit_sha: string;
  org: string;
  repo: string;
}

export interface DeploymentEnvironment {
  name: string;
  owner: string;
  status: EnvironmentStatus;
  latestDeployment: BranchDeployment;
}
