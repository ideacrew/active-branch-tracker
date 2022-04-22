/* eslint-disable unicorn/no-null */
import { PullRequestPayload } from '../interfaces';

export const prClosed: PullRequestPayload = {
  action: 'closed',
  number: 138,
  pull_request: {
    html_url: 'https://github.com/ideacrew/active-branch-tracker/pull/138',
    number: 138,
    state: 'closed',
    title: 'add pr property to new branch document',
    user: {
      login: 'markgoho',
    },
    draft: false,
    body: 'Here are some comments in the body',
    created_at: '2022-04-13T19:17:03Z',
    updated_at: '2022-04-14T14:26:27Z',
    closed_at: '2022-04-14T14:26:27Z',
    merged_at: '2022-04-14T14:26:27Z',
    merge_commit_sha: '012a9ee916f4d45dfff6bcf134bad939bd220cf7',
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
    merged: true,
    merged_by: {
      login: 'markgoho',
    },
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
