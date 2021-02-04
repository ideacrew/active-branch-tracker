import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { BranchDeployment } from './branchDeployment.interface';
import { createSafeBranchName } from '../safeBranchName';

export async function handleBranchDeployment(
  request: functions.https.Request,
  response: functions.Response<unknown>,
) {
  const deployment: BranchDeployment = JSON.parse(request.body.payload);

  await updateEnvironmentWithBranchInfo(deployment);

  await updateBranchWithEnvironmentInfo(deployment);

  response.send(deployment);
}

async function updateBranchWithEnvironmentInfo(
  deployment: BranchDeployment,
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

async function updateEnvironmentWithBranchInfo(deployment: BranchDeployment) {
  const { org, env } = deployment;

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
          deployedAt: FieldValue.serverTimestamp(),
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
