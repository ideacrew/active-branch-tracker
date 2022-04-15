/* eslint-disable camelcase */
import { firestore } from 'firebase-admin';

import { FSWorkflowRun } from './firestore-workflow-run';
import { Commit } from '../webhook/interfaces';

export interface BranchInfo {
  repositoryName: string;
  organizationName: string;
  branchName: string;
  defaultBranch: boolean;
  tracked: boolean;
  timestamp: number;
  head_commit?: Commit;
  createdAt?: firestore.Timestamp;
  createdBy?: string;
  workflowResults: FSWorkflowRun[];
}
