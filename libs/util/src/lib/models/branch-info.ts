/* eslint-disable @typescript-eslint/naming-convention */
import firebase from 'firebase/compat/app';
import { CheckSuiteConclusion } from './check-suite-conclusion';

export interface BranchInfo {
  id?: string;
  repositoryName: string;
  organizationName: string;
  branchName: string;
  head_commit?: {
    id: string;
    committer: {
      name: string;
      email: string;
    };
    author: {
      name: string;
      email: string;
    };
    timestamp: string;
    tree_id: string;
    message: string;
  };
  createdAt: firebase.firestore.Timestamp;
  defaultBranch: boolean;
  createdBy?: string;
  tracked: boolean;
  timestamp: number;

  // This is definitely optional, but is there a different type
  // that could be created where the PR is always present?
  pullRequestNumber?: number;
  workflowResults: FSWorkflowRun[];
}

export interface FSWorkflowRun {
  htmlUrl: string;
  runId: number;
  runStartedAt: string;
  updatedAt: string;
  workflowId: number;
  runtime: number;
  repositoryName: string;
  workflowName: string;
  conclusion: CheckSuiteConclusion | null;
  action: 'requested' | 'completed';
}
