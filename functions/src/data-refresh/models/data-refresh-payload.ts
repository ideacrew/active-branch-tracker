import { DataRefreshStatus } from './app-data';

export type AppName = 'enroll' | 'glue';

export interface DataRefreshPayload {
  app: AppName;
  status: DataRefreshStatus;
  env: string;
  org: string;
  user_name: string;
}
