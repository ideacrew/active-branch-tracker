/* eslint-disable unicorn/no-null */
import { PullRequestPayload } from '../interfaces';

export const prOpened: PullRequestPayload = {
  action: 'opened',
  number: 138,
  pull_request: {
    html_url: 'https://github.com/ideacrew/active-branch-tracker/pull/138',
    number: 138,
    state: 'open',
    title: 'add pr property to new branch document',
    user: {
      login: 'markgoho',
    },
    body: null,
    created_at: '2022-04-13T19:17:03Z',
    updated_at: '2022-04-13T19:17:03Z',
    closed_at: null,
    merged_at: null,
    merge_commit_sha: null,
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    head: {
      ref: '29-track-branch-life-per-developer',
      user: {
        login: 'ideacrew',
      },
      repo: {
        name: 'active-branch-tracker',
      },
    },
    base: {
      ref: 'trunk',
      user: {
        login: 'ideacrew',
      },
      repo: {
        name: 'active-branch-tracker',
      },
    },
    auto_merge: null,
    active_lock_reason: null,
    merged: false,
    mergeable: null,
    rebaseable: null,
    mergeable_state: 'unknown',
    merged_by: null,
    comments: 0,
    review_comments: 0,
    commits: 1,
    additions: 1,
    deletions: 0,
    changed_files: 1,
  },
  repository: {
    name: 'active-branch-tracker',
  },
  organization: {
    login: 'ideacrew',
  },
  sender: {
    login: 'markgoho',
  },
};
