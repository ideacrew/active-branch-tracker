import firebase from 'firebase/compat/app';

export type Architecture = 'standalone' | 'e2e';

export interface OrgEnvironment {
  id: string;
  name: string;
  prodlike: boolean;
  architecture: Architecture;
  owner: string;
  ownerRelease: firebase.firestore.Timestamp;
  lastUpdated?: firebase.firestore.Timestamp;
  enrollBranch?: string;
  hidden?: boolean;
}
