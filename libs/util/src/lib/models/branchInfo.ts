/* eslint-disable @typescript-eslint/naming-convention */
import { CheckSuiteConclusion } from './checkSuiteConclusion';

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
  // Why is this optional?
  head_sha?: string;
  // Is created_at ever not there?
  created_at: string;
  updated_at?: string;
  checkSuiteStatus?: CheckSuiteConclusion;
  defaultBranch: boolean;
  checkSuiteRuns: number;
  checkSuiteFailures: number;
  createdBy?: string;
  createdByUserName?: string;
  tracked: boolean;
  timestamp: number;
  releaseDate?: number;

  // This is definitely optional, but is there a different type
  // that could be created where the PR is always present?
  pullRequestNumber?: number;
}
