import { AppData } from './app-data';
import { LatestDeployment } from './latest-deployment';

export interface EnvironmentService {
  id?: string;
  name: string;
  url: string;
  latestDeployment: LatestDeployment;
  data?: AppData;
}
