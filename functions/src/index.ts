import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { CheckSuitePayload, handleCheckSuiteEvent } from './checkSuite';
import { CreateEventPayload, handleCreateEvent } from './createEvent';
import { DeleteEventPayload, handleDeleteEvent } from './deleteEvent';
import {
  handlePullRequestEvent,
  PullRequestEventPayload,
} from './pullRequestEvent';
import { staleBranches, getStaleBranchesFromDB } from './staleBranches';
import { BrakemanOutput, handleBrakemanOutput } from './brakeman';
import { handleBranchDeployment, BranchDeployment } from './branch-deployment';
import { DeploymentEnvironment } from './deployment-environment';
import { getBranchRef } from './util/branchRef';
import { BranchInfo } from './branchInfo';
import { enableAdminForUser } from './grant-admin';

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

    // case 'check_run':
    //   await handleCheckRunEvent(request.body as CheckRunPayload);
    //   break;

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
    // Needs to be parsed because of how it's being sent
    const deployment: BranchDeployment = JSON.parse(request.body.payload);

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

export const watchEnvironments = functions.firestore
  .document('environments/{environmentId}')
  .onUpdate(async (change, context) => {
    const {
      org: oldOrg,
      repo: oldRepo,
      branch: oldBranch,
      commit_sha: oldSha,
    } = (change.before.data() as DeploymentEnvironment).latestDeployment;

    const {
      branch: newBranch,
      commit_sha: newSha,
    } = (change.after.data() as DeploymentEnvironment).latestDeployment;

    // Check to see if the newest deployment is for the same branch
    if (oldBranch === newBranch && oldSha !== newSha) {
      console.log(
        'Environment has been updated with a new sha of the same branch',
      );
      return Promise.resolve();
    }

    // If the branches are different, find the old branch
    // and remove its environment property
    if (oldBranch !== newBranch) {
      console.log('Environment has been updated with a new branch');
      const branchRef = getBranchRef({
        organizationName: oldOrg,
        repositoryName: oldRepo,
        branchName: oldBranch,
      });

      try {
        const branch = await branchRef.get();
        if (branch.exists) {
          const { environment, ...branchData } = branch.data() as BranchInfo;

          await branchRef.set(branchData);
        }
      } catch (e) {
        console.error('Tried to update branch', { error: e });
        return Promise.resolve();
      }
    }
  });

export const createUserRecord = functions.auth
  .user()
  .onCreate(async (user, context) => {
    await (await import('./new-user/new-user')).createNewUser(user, context);
  });

// export const deleteUserRecord = functions.auth
//   .user()
//   .onDelete(async (user, context) => {
//     await (await import('./delete-user/delete-user')).deleteUser(user, context);
//   });

export const grantAdmin = functions.https.onCall(enableAdminForUser);
