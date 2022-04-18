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

  const pullRequestId = `${organization.login}-${repository.name}-${pull_request.number}`;

  const pullRequestReference = firestore()
    .collection('pullRequests')
    .doc(pullRequestId);

  const batch = firestore().batch();

  switch (action) {
    case 'opened': {
      const pr = handleOpenedPullRequest(pull_request);
      batch.create(pullRequestReference, pr);
      break;
    }

    case 'auto_merge_enabled': {
      const { updated_at } = pull_request;

      batch.set(
        pullRequestReference,
        {
          autoMergeEnabled: firestoreTimestamp(new Date(updated_at)),
        },
        { merge: true },
      );
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
      } = pull_request;

      if (merged_by && merged_at) {
        batch.set(
          pullRequestReference,
          {
            mergedAt: firestoreTimestamp(new Date(merged_at)),
            mergedBy: merged_by?.login,
            stats: {
              commits,
              additions,
              deletions,
              changed_files,
            },
          },
          { merge: true },
        );
      }
      break;
    }

    default:
      logger.info('Fallthrough case in Pull Request Event', action);
  }

  await batch.commit();
};

const handleOpenedPullRequest = (pullRequest: PullRequest): FSPullRequest => {
  const { html_url, number, title, user, created_at } = pullRequest;

  const pr: FSPullRequest = {
    url: html_url,
    number,
    title,
    author: user.login,
    autoMergeEnabled: false,
    createdAt: firestoreTimestamp(new Date(created_at)),
  };

  return pr;
};
