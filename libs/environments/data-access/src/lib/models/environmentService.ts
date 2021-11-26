import { AppData } from './appData';
import { LatestDeployment } from './latestDeployment';

export interface EnvironmentService {
  id?: string;
  name: string;
  url: string;
  latestDeployment: LatestDeployment;
  data?: AppData;
}
