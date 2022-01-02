import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pull-request-payload';
import { createPullRequestDocument } from './util/create-pull-request-document';

export const handleOpenedPullRequest = async (
  payload: PullRequestEventPayload,
): Promise<void> => {
  const pullRequestDocument = createPullRequestDocument(payload);
  const {
    organizationName,
    repositoryName,
    branchName,
    number: pullRequestNumber,
  } = pullRequestDocument;

  try {
    await admin
      .firestore()
      .collection('pullRequests')
      .doc(
        `${organizationName}-${repositoryName}-${branchName}-${pullRequestNumber}`,
      )
      .set(pullRequestDocument);
  } catch (error) {
    functions.logger.error(error);
  }
};
