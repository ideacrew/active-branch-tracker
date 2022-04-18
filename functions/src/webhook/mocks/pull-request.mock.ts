/* eslint-disable unicorn/no-null */
import { faker } from '@faker-js/faker';
import { PullRequestPayload } from '../pull-request';
import { PullRequestReviewPayload } from '../pull-request-review';
import { mockBaseWebhookPayload } from './webhook.mock';

export interface MockPullRequest {
  opened: PullRequestPayload;
  closedAndMerged: PullRequestPayload;
  autoMergeEnabled: PullRequestPayload;
  approved: PullRequestReviewPayload;
  branchName: string;
  prNumber: number;
}

export const mockPullRequest = (): MockPullRequest => {
  const branchName = faker.word.noun(7);
  const prNumber = faker.datatype.number({ min: 1, max: 1000 });

  const createdAt = '2020-01-01T00:00:00Z'; // Midnight UTC
  const updatedAt = '2020-01-01T01:00:00Z'; // 1am UTC
  const approvedAt = '2020-01-01T03:00:00Z'; // 2am UTC
  const mergedAt = approvedAt; // also 2am UTC
  const closedAt = approvedAt; // also 2am UTC

  const basePayload: Omit<PullRequestPayload, 'action'> = {
    // action: 'opened',
    number: prNumber,
    pull_request: {
      html_url: '',
      number: prNumber,
      state: 'open',
      title: '',
      user: {
        login: 'mockUser',
      },
      body: null,
      created_at: createdAt,
      updated_at: updatedAt,
      head: {
        ref: branchName,
        user: {
          login: 'mock-organization',
        },
        repo: {
          name: 'mock-repository',
        },
      },
      base: {
        ref: 'trunk',
        user: {
          login: 'mock-organization',
        },
        repo: {
          name: 'mock-repository',
        },
      },
      merged: false,
    },
    ...mockBaseWebhookPayload(),
  };

  return {
    branchName,
    prNumber,

    opened: {
      ...basePayload,
      action: 'opened',
    },

    autoMergeEnabled: {
      ...basePayload,
      action: 'auto_merge_enabled',
      pull_request: {
        ...basePayload.pull_request,
        auto_merge: {
          enabled_by: {
            login: 'markgoho',
          },
        },
      },
    },

    closedAndMerged: {
      ...basePayload,
      action: 'closed',
      pull_request: {
        ...basePayload.pull_request,
        closed_at: closedAt,
        merged_at: mergedAt,
        merge_commit_sha: '012a9ee916f4d45dfff6bcf134bad939bd220cf7',
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
    },

    approved: {
      ...basePayload,
      action: 'submitted',
      review: {
        user: {
          login: 'markgoho',
        },
        body: '',
        submitted_at: approvedAt,
        state: 'approved',
        html_url:
          'https://github.com/ideacrew/active-branch-tracker/pull/138#pullrequestreview-942367903',
      },
    },
  };
};
