/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
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

  functions.logger.info('THIS IS A PULL REQUEST EVENT', { action });

  switch (action) {
    case 'opened': {
      const pr = handleOpenedPullRequest(pull_request);
      batch.create(pullRequestReference, pr);
      break;
    }

    case 'auto_merge_enabled': {
      const { updated_at } = pull_request;

      batch.update(pullRequestReference, {
        autoMergeEnabled: firestoreTimestamp(new Date(updated_at)),
      });
      break;
    }

    case 'closed': {
      const { merged_by, merged_at } = pull_request;
      if (merged_by && merged_at) {
        batch.update(pullRequestReference, {
          mergedAt: firestoreTimestamp(new Date(merged_at)),
          mergedBy: merged_by?.login,
        });
      }
      break;
    }

    default:
      functions.logger.info('Fallthrough case in Pull Request Event', action);
  }

  await batch.commit();
};

const handleOpenedPullRequest = (
  pullRequest: PullRequest,
  // batch: firestore.WriteBatch,
): FSPullRequest => {
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

// const handleMergedPullRequest = (pullRequest: PullRequest): FSPullRequest => {};
