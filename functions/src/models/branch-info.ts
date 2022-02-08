/* eslint-disable camelcase */
import { FSWorkflowRun } from '.';
import { Commit } from '../webhook/interfaces';

export interface BranchInfo {
  repositoryName: string;
  organizationName: string;
  branchName: string;
  defaultBranch: boolean;
  tracked: boolean;
  timestamp: number;

  head_commit?: Commit;
  createdAt?: FirebaseFirestore.Timestamp;
  createdBy?: string;
  pullRequestNumber?: number;

  workflowResults: FSWorkflowRun[];
}
