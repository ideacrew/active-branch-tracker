export type DataRefreshStatus = 'started' | 'completed' | 'error';

export interface AppData {
  status: DataRefreshStatus;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_name: string;
  dataTimestamp: firebase.default.firestore.Timestamp;
}
