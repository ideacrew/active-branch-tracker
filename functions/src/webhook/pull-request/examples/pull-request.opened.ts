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
    merged: false,
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
