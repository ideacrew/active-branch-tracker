import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pullRequest';

export const handleOpenedPullRequest = async (
  payload: PullRequestEventPayload,
): Promise<void> => {
  const { pull_request: pullRequest, repository, organization } = payload;
  const { login: organizationName } = organization;
  const { number: pullRequestNumber, head } = pullRequest;
  const { ref: branchName } = head;
  const { name: repositoryName } = repository;

  try {
    await admin
      .firestore()
      .collection(`branches`)
      .doc(`${organizationName}-${repositoryName}-${branchName}`)
      .update({ pullRequestNumber });
  } catch (e) {
    functions.logger.error(e);
  }
};
