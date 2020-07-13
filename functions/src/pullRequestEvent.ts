import * as admin from 'firebase-admin';

import { Repository, Organization, Sender } from './webhookPayload';
import { GithubUser } from './user';

export enum PullRequestAction {
  Assigned = 'assigned',
  Unassigned = 'unassigned',
  ReviewRequested = 'review_requested',
  ReviewRequestRemoved = 'review_request_removed',
  Labeled = 'labeled',
  Unlabeled = 'unlabeled',
  Opened = 'opened',
  Edited = 'edited',
  Closed = 'closed',
  ReadyForReview = 'ready_for_review',
  Locked = 'locked',
  Unlocked = 'unlocked',
  Reopened = 'reopened',
  Synchronize = 'synchronize',
}

export interface PullRequestEventPayload {
  action: PullRequestAction;
  number: number; // pull request number
  pull_request: PullRequest;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export interface PullRequest {
  url: string; // link to pull request
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: 8; // PR number for link
  state: 'open' | 'closed' | 'all'; // critical property
  locked: boolean;
  title: string;
  user: GithubUser;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
  merge_commit_sha: string;
  assignee: any;
  assignees: any[];
  requested_reviewers: any[];
  requested_teams: any[];
  labels: any[];
  milestone: any;
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
    user: GithubUser;
    repo: Repository;
  };
  base: {
    label: string;
    ref: string;
    sha: string;
    user: GithubUser;
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
  merged: boolean; // critical property
  mergeable: any;
  rebaseable: any;
  mergeable_state: 'unknown';
  merged_by: GithubUser;
  comments: 0;
  review_comments: 0;
  maintainer_can_modify: boolean;
  commits: 4;
  additions: 0;
  deletions: 0;
  changed_files: 0;
}

export async function handlePullRequestEvent(
  payload: PullRequestEventPayload
): Promise<any> {
  const { action, pull_request, repository, organization } = payload;
  const { login: organizationName } = organization;
  const { number: pullRequestNumber, head, merged } = pull_request;

  const { ref: branchName } = head;

  const { name: repositoryName } = repository;

  if (action === PullRequestAction.Opened) {
    // Do for new PR being opened
    try {
      await admin
        .firestore()
        .collection(`branches`)
        .doc(`${organizationName}-${repositoryName}-${branchName}`)
        .update({ pullRequestNumber });
    } catch (e) {
      console.error(e);
    }
  } else if (action === PullRequestAction.Closed && merged === true) {
    // delete document is PR is closed AND merged
    try {
      const branchRef = admin
        .firestore()
        .collection(`branches`)
        .doc(`${organizationName}-${repositoryName}-${branchName}`);

      const branch = await branchRef.get();

      if (branch.exists) {
        await branchRef.delete();
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log('pull_request event not a merge');
    return Promise.resolve();
  }
}
