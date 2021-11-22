import { AppData } from './appData';
import { LatestDeployment } from './latestDeployment';

interface BaseService {
  id?: string;
  name: string;
  url: string;
  latestDeployment: LatestDeployment;
}

interface StatefulService extends BaseService {
  stateful: true;
  data: AppData;
}

interface StatelessService extends BaseService {
  stateful: false;
}

export type EnvironmentService = StatefulService | StatelessService;
