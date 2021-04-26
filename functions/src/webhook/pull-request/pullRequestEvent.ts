/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pullRequest';
import { handleClosedPullRequest } from './pullRequest.closed';
import { handleOpenedPullRequest } from './pullRequest.opened';

/**
 * Handles a Pull Request webhook
 * @param {PullRequestEventPayload} payload A PR event payload
 * @return { Promise<unknown> } a promise
 */
export async function handlePullRequestEvent(
  payload: PullRequestEventPayload,
): Promise<void> {
  const { action } = payload;

  switch (action) {
    case 'opened':
    case 'synchronize':
      await handleOpenedPullRequest(payload);
      break;

    case 'closed':
      await handleClosedPullRequest(payload);
      break;

    default:
      functions.logger.info('Fallthrough case in PR Action Handling', {
        event: action,
      });
  }
}
