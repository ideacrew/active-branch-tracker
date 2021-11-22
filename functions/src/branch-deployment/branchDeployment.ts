/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { BranchDeploymentPayload } from './branchDeployment.interface';
import { checkOwnership } from '../check-ownership/checkOwnership';
import { sendSlackMessage } from '../slack-notifications/slackNotification';
import { yellrEnvLink } from '../util/yellrEnvLink';
import { updateServiceWithBranchInfo } from './updateServiceWithBranchInfo';
import { updateEnvironment } from './updateEnvironment';

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
  await checkEnvironmentOwnership(deployment);
  await updateEnvironment(deployment);
  await updateServiceWithBranchInfo(deployment);
  response.send(deployment);
}

export const handleBranchDeploymentV2 = async (
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> => {
  const deployment: BranchDeploymentPayload = request.body;
  await checkEnvironmentOwnership(deployment);
  await updateEnvironment(deployment);
  await updateServiceWithBranchInfo(deployment);
  response.send(deployment);
};

const checkEnvironmentOwnership = async (
  deployment: BranchDeploymentPayload,
): Promise<void> => {
  const { org, env, status, branch } = deployment;
  const ownedEnvironment = await checkOwnership({ org, env });

  if (!ownedEnvironment && status === 'started') {
    const yellrLink = yellrEnvLink({ org, env });
    functions.logger.info(`${org}/${env} is not owned!`);
    await sendSlackMessage(
      `⚠ <!channel> *${branch}* is being deployed to <${yellrLink}|*${org}-${env}*> with _no current owner_! ⚠`,
    );
  }
};
