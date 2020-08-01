import { EnvironmentStatus, BranchDeployment } from '@idc/util';

/**
 * Interface for the 'Environments' data
 */
export interface EnvironmentsEntity {
  id: string | number; // Primary ID
  name: string;
  owner: string;
  status: EnvironmentStatus;
  latestDeployment: BranchDeployment;
}
