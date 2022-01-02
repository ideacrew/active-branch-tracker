import { AppData } from '../data-refresh/models';
import { LatestDeployment } from './latest-deployment';

// interface BaseService {
//   id?: string;
//   name: string;
//   url: string;
//   latestDeployment: LatestDeployment;
// }

// interface StatefulService extends BaseService {
//   stateful: true;
//   data: AppData;
// }

// interface StatelessService extends BaseService {
//   stateful: false;
// }

// export type EnvironmentService = StatefulService | StatelessService;

export interface EnvironmentService {
  name: string;
  url: string;
  latestDeployment: LatestDeployment;
  stateful: boolean;
  data?: AppData;
}
