export type DataRefreshStatus = 'started' | 'completed' | 'error';

export interface AppData {
  status: DataRefreshStatus;
  user_name: string;
  dataTimestamp: FirebaseFirestore.Timestamp;
}
