import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pullRequest';

export const handleClosedPullRequest = async (
  payload: PullRequestEventPayload,
): Promise<void> => {
  if (payload.pull_request.merged) {
    const { pull_request: pullRequest, repository, organization } = payload;
    const { login: organizationName } = organization;
    const { head } = pullRequest;
    const { ref: branchName } = head;
    const { name: repositoryName } = repository;

    const branchRef = admin
      .firestore()
      .collection(`branches`)
      .doc(`${organizationName}-${repositoryName}-${branchName}`);

    try {
      const branch = await branchRef.get();

      if (branch.exists) {
        await branchRef.delete();
      }
    } catch (e) {
      functions.logger.error(
        'Error deleting branch associated with closed Pull Request',
        { error: e },
      );
    }
  } else {
    functions.logger.info('Pull Request closed, but not merged');
    return Promise.resolve();
  }
};
