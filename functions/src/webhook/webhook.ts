import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { handleCreateEvent, CreateEventPayload } from './create';
import { DeletePayload, handleDeleteEvent } from './delete';
import { handleWorkflowRunEvent, WorkflowRunPayload } from './workflow-run';
import { PushEventPayload, handlePushEvent } from './push';
import { handlePullRequestEvent, PullRequestPayload } from './pull-request';
import {
  handlePullRequestReviewEvent,
  PullRequestReviewPayload,
} from './pull-request-review';

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
    case 'create': {
      await handleCreateEvent(request.body as CreateEventPayload);
      break;
    }

    case 'delete': {
      await handleDeleteEvent(request.body as DeletePayload);
      break;
    }

    case 'push': {
      await handlePushEvent(request.body as PushEventPayload);
      break;
    }

    case 'workflow_run': {
      await handleWorkflowRunEvent(request.body as WorkflowRunPayload);
      break;
    }

    case 'pull_request': {
      await handlePullRequestEvent(request.body as PullRequestPayload);
      break;
    }

    case 'pull_request_review': {
      await handlePullRequestReviewEvent(
        request.body as PullRequestReviewPayload,
      );
      break;
    }

    default: {
      functions.logger.info('Fallthrough case in GitHub Event', eventType);
    }
  }

  response.status(200).send('Thanks');
}
