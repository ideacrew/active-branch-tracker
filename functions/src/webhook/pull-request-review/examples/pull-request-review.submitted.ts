/* eslint-disable unicorn/no-null */
import { PullRequestReviewPayload } from '../interfaces';

export const prReviewSubmitted: PullRequestReviewPayload = {
  action: 'submitted',
  review: {
    user: {
      login: 'mdkaraman',
    },
    body: '',
    submitted_at: '2022-04-14T14:26:26Z',
    state: 'approved',
    html_url:
      'https://github.com/ideacrew/active-branch-tracker/pull/138#pullrequestreview-942367903',
  },
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
    updated_at: '2022-04-14T14:26:26Z',
    merge_commit_sha: 'e4976bb284f9c856c1c7494657fb3da8d19eb291',
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
  },
  repository: {
    name: 'active-branch-tracker',
  },
  organization: {
    login: 'ideacrew',
  },
  sender: {
    login: 'mdkaraman',
  },
};
