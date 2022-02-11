/* eslint-disable @typescript-eslint/naming-convention */
import firebase from 'firebase/compat/app';

export interface FSServiceDeployment {
  id: string;
  image: string;
  env: string;
  org: 'maine' | 'dchbx';
  status: 'started' | 'completed';
  user_name: string;
  registry: string;
  owner: string;
  repo: string;
  branch: string;
  commit_sha: string;
  app: string;
  completed: firebase.firestore.Timestamp;
}
