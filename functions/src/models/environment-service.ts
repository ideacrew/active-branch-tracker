import { AppData } from '../data-refresh/models';
import { LatestDeployment } from './latest-deployment';
export interface EnvironmentService {
  name: string;
  url: string;
  latestDeployment: LatestDeployment;
  stateful: boolean;
  data?: AppData;
}
