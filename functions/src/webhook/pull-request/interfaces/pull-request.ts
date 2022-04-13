import { PRBranchReference } from './branch-reference';

export interface PullRequest {
  html_url: string; // https://github.com/ideacrew/active-branch-tracker/pull/138
  number: number; // 138
  state: 'open' | 'closed';
  title: string; // add pr property to new branch document
  user: {
    login: string; // markgoho
  };
  body: string | null;
  created_at: string; // 2022-04-13T19:17:03Z
  updated_at: string; // 2022-04-13T19:17:03Z
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: unknown;
  assignees: unknown[];
  requested_reviewers: unknown[];
  requested_teams: unknown[];
  labels: unknown[];
  milestone: unknown;
  draft: boolean;
  head: PRBranchReference;
  base: PRBranchReference;
  auto_merge: unknown | null;
  active_lock_reason: unknown | null;
  merged: boolean;
  mergeable: unknown | null;
  rebaseable: unknown | null;
  mergeable_state: string;
  merged_by: unknown | null;
  comments: number;
  review_comments: number;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}
