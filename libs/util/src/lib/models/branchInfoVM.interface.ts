import { BranchInfo } from '@idc/branches/data-access';

export interface BranchInfoVM extends BranchInfo {
  branchLink: string;
  commitLink: string;
  pullRequestLink: string;
  failurePercentage: number;
}
