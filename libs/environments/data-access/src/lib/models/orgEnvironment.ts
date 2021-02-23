import { AppData } from './appData';
import { LatestDeployment } from './latestDeployment';

export type Architecture = 'standalone' | 'e2e';
export type AppName = 'enroll' | 'gluedb';

export interface OrgEnvironment {
  id: string;
  name: string;
  prodlike: boolean;
  architecture: Architecture;
  latestDeployment: LatestDeployment;
  owner: string;
  ownerRelease: firebase.default.firestore.Timestamp;
  gluedb?: AppData;
  enroll?: AppData;
}
