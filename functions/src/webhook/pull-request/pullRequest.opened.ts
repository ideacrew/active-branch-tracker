import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pullRequestPayload';
import { createPullRequestDocument } from './util/createPullRequestDocument';

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
  } catch (e) {
    functions.logger.error(e);
  }
};
