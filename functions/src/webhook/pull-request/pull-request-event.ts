/* eslint-disable unicorn/no-null */
/* eslint-disable camelcase */
import { logger } from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { PullRequest, PullRequestPayload } from './interfaces';
import { FSPullRequest } from '../../models';
import { firestoreTimestamp } from '../../util';

export const handlePullRequestEvent = async (
  payload: PullRequestPayload,
): Promise<void> => {
  const { pull_request, action, organization, repository } = payload;

  // Don't save PRs from Dependabot or PRs that aren't against trunk
  if (
    pull_request.user.login.includes('bot') ||
    pull_request.base.ref !== 'trunk'
  ) {
    return;
  }

  const pullRequestId = `${organization.login}-${repository.name}-${pull_request.number}`;

  const pullRequestReference = firestore()
    .collection('pullRequests')
    .doc(pullRequestId);

  const authorReference = firestore()
    .collection('authors')
    .doc(pull_request.user.login)
    .collection('pullRequests')
    .doc(pullRequestId);

  const batch = firestore().batch();

  logger.info('Handling pull request event', {
    event: action,
  });

  switch (action) {
    case 'ready_for_review':
    case 'opened': {
      if (pull_request.draft === true) {
        break;
      }

      const pr = handleOpenedPullRequest(pull_request);
      batch.set(pullRequestReference, pr);
      batch.set(authorReference, pr);
      break;
    }

    case 'auto_merge_enabled': {
      const { updated_at, head, base, auto_merge } = pull_request;

      const updatedPR: Partial<FSPullRequest> = {
        autoMergeEnabledAt: firestoreTimestamp(new Date(updated_at)),
        autoMergeEnabledBy: auto_merge?.enabled_by?.login,
        branchName: head.ref,
        targetBranch: base.ref,
      };

      batch.set(pullRequestReference, updatedPR, { merge: true });
      batch.set(authorReference, updatedPR, { merge: true });
      break;
    }

    case 'converted_to_draft': {
      batch.delete(pullRequestReference);
      batch.delete(authorReference);
      break;
    }

    case 'closed': {
      const {
        merged_by,
        merged_at,
        commits,
        additions,
        deletions,
        changed_files,
        base,
        head,
      } = pull_request;

      if (
        merged_by &&
        merged_at &&
        (base.ref === 'trunk' || base.ref === 'master')
      ) {
        const updatedPR: Partial<FSPullRequest> = {
          mergedAt: firestoreTimestamp(new Date(merged_at)),
          mergedBy: merged_by?.login,
          stats: {
            commits: commits ?? 0,
            additions: additions ?? 0,
            deletions: deletions ?? 0,
            changed_files: changed_files ?? 0,
          },
          branchName: head.ref,
          targetBranch: base.ref,
        };

        batch.set(pullRequestReference, updatedPR, { merge: true });
        batch.set(authorReference, updatedPR, { merge: true });
      }
      break;
    }

    default:
      logger.info('Fallthrough case in Pull Request Event', action);
      break;
  }

  await batch.commit();
};

const handleOpenedPullRequest = (pullRequest: PullRequest): FSPullRequest => {
  const { html_url, number, title, user, created_at, head, base } = pullRequest;

  const pr: FSPullRequest = {
    url: html_url,
    number,
    title,
    mergedBy: null,
    mergedAt: null,
    author: user.login,
    createdAt: firestoreTimestamp(new Date(created_at)),
    branchName: head.ref,
    targetBranch: base.ref,
  };

  return pr;
};
