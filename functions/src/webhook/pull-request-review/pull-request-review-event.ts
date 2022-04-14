import * as functions from 'firebase-functions';

import { PullRequestReviewPayload } from './interfaces';

export const handlePullRequestReviewEvent = async (
  payload: PullRequestReviewPayload,
): Promise<void> => {
  functions.logger.info('Here is the PR Review payload', payload);
};
