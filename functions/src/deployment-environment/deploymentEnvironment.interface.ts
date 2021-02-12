import { BranchDeploymentPayload } from '../branch-deployment';
import { AppData } from '../data-refresh/dataRefresh';

export type LatestDeployment = BranchDeploymentPayload & {
  started: FirebaseFirestore.Timestamp;
  completed: FirebaseFirestore.Timestamp;
};

export interface DeploymentEnvironment {
  name: string;
  owner: string;
  latestDeployment: LatestDeployment;
  enroll?: AppData;
  glue?: AppData;
}
