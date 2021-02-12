import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { BranchDeploymentPayload } from './branchDeployment.interface';
import { createSafeBranchName } from '../safeBranchName';
import { checkOwnership } from '../check-ownership/checkOwnership';
import { sendSlackMessage } from '../slack-notifications/slackNotification';
import { yellrEnvLink } from '../util/yellrEnvLink';

/**
 * Handles a new branch deployment
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 * @return {Promise<void>}
 */
export async function handleBranchDeployment(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  const deployment: BranchDeploymentPayload = JSON.parse(request.body.payload);

  const { org, env, branch, status } = deployment;

  const ownedEnvironment = await checkOwnership({ org, env });
  if (!ownedEnvironment && status === 'started') {
    const yellrLink = yellrEnvLink({ org, env });
    await sendSlackMessage(
      `⚠ <!channel> *${branch}* is being deployed to <${yellrLink}|*${org}-${env}*> with _no current owner_! ⚠`,
    );
  }

  await updateEnvironmentWithBranchInfo(deployment);

  await updateBranchWithEnvironmentInfo(deployment);

  response.send(deployment);
}

/**
 * Updates a branch document with environment information
 * @param {BranchDeploymentPayload} deployment
 * @return {Promise<void>}
 */
async function updateBranchWithEnvironmentInfo(
  deployment: BranchDeploymentPayload,
): Promise<void> {
  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${deployment.org}-${createSafeBranchName(deployment.branch)}`);

  try {
    await branchRef.set({ environment: deployment.env }, { merge: true });
  } catch (e) {
    functions.logger.error(
      'Could not update environment on branch',
      deployment.branch,
      e,
    );
    return Promise.resolve();
  }
}

/**
 *
 * @param {BranchDeploymentPayload} deployment
 * @return {Promise<void>}
 */
async function updateEnvironmentWithBranchInfo(
  deployment: BranchDeploymentPayload,
): Promise<void> {
  const { org, env, status } = deployment;

  const FieldValue = admin.firestore.FieldValue;

  const environmentRef = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env);

  try {
    await environmentRef.set(
      {
        latestDeployment: {
          ...deployment,
          [status]: FieldValue.serverTimestamp(),
        },
      },
      { merge: true },
    );
  } catch (e) {
    functions.logger.error(
      'Could not set environment with latest deployment',
      e,
    );
  }
}
