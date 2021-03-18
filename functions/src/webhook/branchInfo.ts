/* eslint-disable camelcase */
import { CheckConclusion } from './checkConclusion';

export interface BranchInfo {
  repositoryName: string;
  organizationName: string;
  branchName: string;
  defaultBranch: boolean;
  checkSuiteRuns: number;
  checkSuiteFailures: number;
  tracked: boolean;
  timestamp: number;
  status: BranchStatus;

  head_commit?: {
    id: string;
    committer: {
      name: string;
      email?: string;
    };
    author: {
      name: string;
      email?: string;
    };
    timestamp?: string;
    tree_id?: string;
    message?: string;
  };
  head_sha?: string;
  created_at?: string;
  updated_at?: string;
  checkSuiteStatus?: CheckConclusion;
  createdBy?: string;
  releaseDate?: number;
  pullRequestNumber?: number;
}

export enum BranchStatus {
  Development = 'Development',
  Review = 'Stakeholder Review',
  Accepted = 'Accepted Pending Release',
  OnHold = 'On Hold',
}
