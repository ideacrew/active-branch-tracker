import { Assignee, Label } from '../../interfaces';
import { WebhookPayload } from '../../interfaces/basePayload';
import { GitHubUser } from '../../interfaces/githubUser';
import { Repository } from '../../interfaces/repository';

/* eslint-disable camelcase */
export interface PullRequestEventPayload extends WebhookPayload {
  action: PullRequestAction;
  changes?: {
    title: {
      from: string;
    };
    body: {
      from: string;
    };
  };
  number: number; // pull request number
  pull_request: PullRequest;
}

export type PullRequestAction =
  | 'opened'
  | 'edited'
  | 'closed'
  | 'assigned'
  | 'unassigned'
  | 'review_requested'
  | 'review_request_removed'
  | 'ready_for_review'
  | 'converted_to_draft'
  | 'labeled'
  | 'unlabeled'
  | 'synchronize'
  | 'auto_merge_enabled'
  | 'auto_merge_disabled'
  | 'locked'
  | 'unlocked'
  | 'reopened';

export interface PullRequest {
  url: string; // link to pull request
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number; // PR number for link
  state: 'open' | 'closed' | 'all'; // critical property
  locked: boolean;
  title: string;
  user: GitHubUser;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: Assignee | null;
  assignees: Assignee[];
  requested_reviewers: GitHubUser[];
  requested_teams: unknown[];
  labels: Label[];
  milestone: unknown;
  draft: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: {
    label: string;
    ref: string;
    sha: string;
    user: GitHubUser;
    repo: Repository;
  };
  base: {
    label: string;
    ref: string;
    sha: string;
    user: GitHubUser;
    repo: Repository;
  };
  _links: {
    self: {
      href: string;
    };
    html: {
      href: string;
    };
    issue: {
      href: string;
    };
    comments: {
      href: string;
    };
    review_comments: {
      href: string;
    };
    review_comment: {
      href: string;
    };
    commits: {
      href: string;
    };
    statuses: {
      href: string;
    };
  };
  author_association: string;
  auto_merge: unknown;
  active_lock_reason: unknown;
  merged: boolean; // critical property
  mergeable: unknown;
  rebaseable: unknown;
  mergeable_state: string;
  merged_by: GitHubUser | null;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}
