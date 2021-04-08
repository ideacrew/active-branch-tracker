/* eslint-disable camelcase */
import { IssueCommentPayload } from './interfaces/issueComment';

import { handleCreatedIssueComment } from './issueComment.created';

/**
 * Handles a Pull Request webhook
 * @param {PullRequestEventPayload} payload A PR event payload
 * @return { Promise<unknown> } a promise
 */
export async function handleIssueCommentEvent(
  payload: IssueCommentPayload,
): Promise<void> {
  const { action } = payload;

  switch (action) {
    case 'created':
      await handleCreatedIssueComment(payload);
      break;

    case 'deleted':
      // await handleDeletedIssueComment(payload);
      break;

    case 'edited':
      break;
  }
}
