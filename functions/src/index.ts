import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { CheckSuitePayload, handleCheckSuiteEvent } from './checkSuite';
import { CreateEventPayload, handleCreateEvent } from './createEvent';
import { DeleteEventPayload, handleDeleteEvent } from './deleteEvent';
import { handleCheckRunEvent, CheckRunPayload } from './checkRun';
import {
  handlePullRequestEvent,
  PullRequestEventPayload,
} from './pullRequestEvent';
import { staleBranches, getStaleBranchesFromDB } from './staleBranches';
import { BrakemanOutput, handleBrakemanOutput } from './brakeman';
import {
  handleBranchDeployment,
  BranchDeployment,
  BranchDeploymentResponse,
} from './branch-deployment';

admin.initializeApp();

export const webhook = functions.https.onRequest(async (request, response) => {
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

    case 'check_run':
      await handleCheckRunEvent(request.body as CheckRunPayload);
      break;

    case 'pull_request':
      await handlePullRequestEvent(request.body as PullRequestEventPayload);
      break;
  }

  response.status(200).send('Thanks');
});

// Run every Friday at 3:15pm Eastern Time
export const oldBranchesNotification = functions.pubsub
  .schedule('45 9 * * 1')
  .timeZone('America/New_York')
  .onRun(staleBranches);

export const staleBranchOnDemand = functions.https.onRequest(
  async (request, response) => {
    const oldBranches = await getStaleBranchesFromDB();

    response.status(200).send(oldBranches);
  },
);

export const branchDeployment = functions.https.onRequest(
  async (request, response) => {
    const deployment: BranchDeployment = (request.body as BranchDeploymentResponse)
      .deployment;

    console.log({ 'request.body': request.body });
    console.log({ 'request.body.deployment': request.body.deployment });

    await handleBranchDeployment(deployment);
    response.status(200).send();
  },
);

export const brakeManOutput = functions.https.onRequest(
  async (request, response) => {
    await handleBrakemanOutput(request.body as BrakemanOutput);
    response.status(200).send();
  },
);
