import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { BranchDeploymentPayload } from './branchDeployment.interface';
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
  functions.logger.info('Incoming branch deployment payload', deployment);

  const { org, env, branch, status } = deployment;

  // Could this be a separate function?
  const ownedEnvironment = await checkOwnership({ org, env });

  if (!ownedEnvironment && status === 'started') {
    const yellrLink = yellrEnvLink({ org, env });
    functions.logger.info(`${org}/${env} is not owned!`);
    await sendSlackMessage(
      `⚠ <!channel> *${branch}* is being deployed to <${yellrLink}|*${org}-${env}*> with _no current owner_! ⚠`,
    );
  }

  await updateEnvironmentWithBranchInfo(deployment);

  response.send(deployment);
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
    .doc(env.toLowerCase());

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
