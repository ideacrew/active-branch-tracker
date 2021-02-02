import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { CheckSuitePayload, handleCheckSuiteEvent } from './checkSuite';
import { CreateEventPayload, handleCreateEvent } from './createEvent';
import { DeleteEventPayload, handleDeleteEvent } from './deleteEvent';
import {
  handlePullRequestEvent,
  PullRequestEventPayload,
} from './pullRequestEvent';

export async function handleWebhook(
  request: functions.https.Request,
  response: functions.Response<unknown>,
) {
  const eventType = request.header('X-Github-Event');

  console.log({ eventType });

  switch (eventType) {
    case 'create':
      await handleCreateEvent(request.body as CreateEventPayload);
      break;

    case 'delete':
      await handleDeleteEvent(request.body as DeleteEventPayload);
      break;

    case 'check_suite':
      await handleCheckSuiteEvent(request.body as CheckSuitePayload);
      break;

    case 'pull_request':
      await handlePullRequestEvent(request.body as PullRequestEventPayload);
      break;
  }

  response.status(200).send('Thanks');
}
