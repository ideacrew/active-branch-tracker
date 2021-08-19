import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { handleCheckSuiteEvent } from './check-suite/checkSuite';
import { handleCreateEvent } from './createEvent';
import { handleDeleteEvent } from './deleteEvent';

import { handleIssueCommentEvent, IssueCommentPayload } from './issue-comment';
import { CreateEventPayload, DeleteEventPayload } from './interfaces';
import { CheckSuitePayload } from './check-suite';

/**
 * Handles the incoming webhook from GitHub Actions
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 */
export async function handleWebhook(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  const eventType = request.header('X-Github-Event');

  switch (eventType) {
    case 'create':
      await handleCreateEvent(request.body as CreateEventPayload);
      break;

    case 'delete':
      await handleDeleteEvent(request.body as DeleteEventPayload);
      break;

    case 'check_suite':
      await handleCheckSuiteEvent(
        request.body as CheckSuitePayload<'completed'>,
      );
      break;

    case 'issue_comment':
      await handleIssueCommentEvent(request.body as IssueCommentPayload);
      break;

    default:
      functions.logger.info('Fallthrough case in GitHub Event', eventType);
  }

  response.status(200).send('Thanks');
}
