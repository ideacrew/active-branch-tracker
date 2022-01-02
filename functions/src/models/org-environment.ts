export type Architecture = 'standalone' | 'e2e';

export interface OrgEnvironment {
  id: string;
  name: string;
  prodlike: boolean;
  architecture: Architecture;
  owner: string;
  ownerRelease: FirebaseFirestore.Timestamp;
  lastUpdated?: FirebaseFirestore.Timestamp;
  enrollBranch?: string;
}
