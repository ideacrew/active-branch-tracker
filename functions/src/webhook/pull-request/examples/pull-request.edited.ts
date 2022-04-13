/* eslint-disable unicorn/no-null */
import { PullRequestPayload } from '../interfaces';

export const prEdited: PullRequestPayload = {
  action: 'edited',
  number: 138,
  pull_request: {
    html_url: '',
    number: 138,
    state: 'open',
    title: 'add pr property to new branch document',
    user: {
      login: 'markgoho',
    },
    body: 'Here are some comments in the body',
    created_at: '2022-04-13T19:17:03Z',
    updated_at: '2022-04-13T20:00:11Z',
    closed_at: null,
    merged_at: null,
    merge_commit_sha: 'b975f935ab008f75d9728005e39537daadd202da',
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
    mergeable: true,
    rebaseable: true,
    mergeable_state: 'clean',
    merged_by: null,
    comments: 0,
    review_comments: 0,
    commits: 1,
    additions: 1,
    deletions: 0,
    changed_files: 1,
  },
  changes: {},
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
