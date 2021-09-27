/* eslint-disable camelcase */
import { CheckConclusion, HeadCommit } from '../webhook/interfaces';

export interface BranchInfo {
  repositoryName: string;
  organizationName: string;
  branchName: string;
  defaultBranch: boolean;
  checkSuiteRuns: number;
  checkSuiteFailures: number;
  tracked: boolean;
  timestamp: number;

  head_commit?: HeadCommit;
  head_sha?: string;
  created_at?: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updated_at?: string;
  checkSuiteStatus?: CheckConclusion;
  createdBy?: string;
  createdByUsername?: string;
  releaseDate?: number;
  pullRequestNumber?: number;

  failureMessageTimestamp?: string;
}
