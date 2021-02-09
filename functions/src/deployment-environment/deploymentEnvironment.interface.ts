import { BranchDeployment } from '../branch-deployment';
import { AppData } from '../data-refresh/dataRefresh';

export interface DeploymentEnvironment {
  name: string;
  owner: string;
  latestDeployment: BranchDeployment;
  enroll?: AppData;
  glue?: AppData;
}
