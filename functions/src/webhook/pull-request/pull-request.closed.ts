import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pull-request-payload';

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

  const pullRequestReference = admin
    .firestore()
    .collection(`pullRequests`)
    .doc(
      `${organizationName}-${repositoryName}-${head.ref}-${pullRequestNumber}`,
    );

  const prDocument = await pullRequestReference.get();

  if (prDocument.exists) {
    if (merged) {
      // Change this to be a reference to the PR document
      try {
        await pullRequestReference.update({
          merged,
          closed: closedAt === null ? false : true,
        });
      } catch (error) {
        functions.logger.error('Error updating Pull Request as merged', {
          error: error,
        });
      }
    } else {
      try {
        await pullRequestReference.update({
          closed: closedAt === null ? false : true,
        });
      } catch (error) {
        functions.logger.error('Error updating Pull Request as closed', {
          error: error,
        });
      }
    }
  } else {
    functions.logger.error(
      'Pull Request Document could not be updated because it did not exist',
    );
    return;
  }
};
