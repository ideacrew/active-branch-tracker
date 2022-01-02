import { BranchReference } from './branch-reference';

export interface PullRequestSummary {
  url: string; // direct link to pull request
  id: number;
  number: number; // pull request number
  head: BranchReference;
  base: BranchReference;
}
