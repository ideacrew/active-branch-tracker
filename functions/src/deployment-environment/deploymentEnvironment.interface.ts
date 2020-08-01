import { BranchDeployment } from '../branch-deployment';
import { EnvironmentStatus } from './environmentStatus.enum';

export interface DeploymentEnvironment {
  name: string;
  owner: string;
  status: EnvironmentStatus;
  latestDeployment: BranchDeployment;
}
