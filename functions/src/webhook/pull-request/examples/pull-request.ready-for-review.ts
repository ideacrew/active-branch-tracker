/* eslint-disable unicorn/no-null */
import { PullRequestPayload } from '../interfaces';

export const prReadyForReview: PullRequestPayload = {
  action: 'ready_for_review',
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
    merged: false,
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
  },
  repository: {
    name: 'fdsh_gateway',
  },
  organization: {
    login: 'ideacrew',
  },
  sender: {
    login: 'kristinmerbach',
  },
};
