/* eslint-disable unicorn/no-null */
import { PullRequestPayload } from '../interfaces';

export const prAutoMergeEnabled: PullRequestPayload = {
  action: 'auto_merge_enabled',
  number: 138,
  pull_request: {
    html_url: 'https://github.com/ideacrew/active-branch-tracker/pull/138',
    number: 138,
    state: 'open',
    title: 'add pr property to new branch document',
    user: {
      login: 'markgoho',
    },
    body: 'Here are some comments in the body',
    created_at: '2022-04-13T19:17:03Z',
    updated_at: '2022-04-13T20:35:01Z',
    closed_at: null,
    merged_at: null,
    merge_commit_sha: 'e4976bb284f9c856c1c7494657fb3da8d19eb291',
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

    auto_merge: {
      enabled_by: {
        login: 'markgoho',
      },
    },
    merged: false,
    mergeable: true,
    rebaseable: true,
    mergeable_state: 'clean',
    merged_by: null,
    comments: 0,
    review_comments: 0,
    commits: 3,
    additions: 1222,
    deletions: 10,
    changed_files: 17,
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
