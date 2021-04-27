import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pullRequestPayload';

export const handleClosedPullRequest = async (
  payload: PullRequestEventPayload,
): Promise<void> => {
  const { pull_request: pullRequest, repository, organization } = payload;
  const { login: organizationName } = organization;
  const {
    head,
    number: pullRequestNumber,
    merged,
    closed_at: closedAt,
  } = pullRequest;
  const { name: repositoryName } = repository;

  const pullRequestRef = admin
    .firestore()
    .collection(`pullRequests`)
    .doc(
      `${organizationName}-${repositoryName}-${head.ref}-${pullRequestNumber}`,
    );

  const prDoc = await pullRequestRef.get();

  if (prDoc.exists) {
    if (merged) {
      // Change this to be a reference to the PR document
      try {
        await pullRequestRef.update({
          merged,
          closed: closedAt === null ? false : true,
        });
      } catch (e) {
        functions.logger.error('Error updating Pull Request as merged', {
          error: e,
        });
      }
    } else {
      try {
        await pullRequestRef.update({
          closed: closedAt === null ? false : true,
        });
      } catch (e) {
        functions.logger.error('Error updating Pull Request as closed', {
          error: e,
        });
      }
    }
  } else {
    functions.logger.error(
      'Pull Request Document could not be updated because it did not exist',
    );
    return Promise.resolve();
  }
};
