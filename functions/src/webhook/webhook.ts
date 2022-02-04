import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { handleCreateEvent, CreateEventPayload } from './create';
import { DeleteEventPayload, handleDeleteEvent } from './delete';
import { handleWorkflowRunEvent, WorkflowRunPayload } from './workflow-run';
import { PushEventPayload, handlePushEvent } from './push';

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

    case 'push':
      await handlePushEvent(request.body as PushEventPayload);
      break;

    case 'workflow_run':
      {
        const payload = request.body as WorkflowRunPayload;

        if (payload.action === 'completed') {
          await handleWorkflowRunEvent(payload);
        }
      }

      break;

    default:
      functions.logger.info('Fallthrough case in GitHub Event', eventType);
  }

  response.status(200).send('Thanks');
}
