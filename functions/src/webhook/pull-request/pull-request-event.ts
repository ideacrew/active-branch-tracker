/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pull-request-payload';
import { handleClosedPullRequest } from './pull-request.closed';
import { handleOpenedPullRequest } from './pull-request.opened';

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
    case 'converted_to_draft':
    case 'ready_for_review':
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
