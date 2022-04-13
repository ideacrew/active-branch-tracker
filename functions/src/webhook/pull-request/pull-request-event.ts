import * as functions from 'firebase-functions';

import { PullRequestPayload } from './interfaces';

export const handlePullRequestEvent = async (
  payload: PullRequestPayload,
): Promise<void> => {
  functions.logger.info('Here is the PR payload', payload);
};
