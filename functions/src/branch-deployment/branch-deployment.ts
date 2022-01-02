/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { BranchDeploymentPayload } from './branch-deployment.interface';
import { updateServiceWithBranchInfo } from './update-service-with-branch-info';
import { updateEnvironment } from './update-environment';
import { checkEnvironmentOwnership } from '../check-ownership';

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
