import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// eslint-disable-next-line import/no-unresolved
import { FieldValue } from 'firebase-admin/firestore';

import { BranchDeploymentPayload } from './branch-deployment.interface';
import { ServiceDeployment } from '../service-deployment';

export const updateEnvironment = async (
  deployment: BranchDeploymentPayload | ServiceDeployment,
): Promise<void> => {
  const { org, env, app, branch } = deployment;

  const environmentReference = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase());

  try {
    await environmentReference.set(
      {
        // Conditionally add the enroll branch that was deployed
        ...(app === 'enroll' && { enrollBranch: branch }),

        // Any update to the environment will reflect here
        lastUpdated: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch {
    functions.logger.error(`Could not update ${org}-${env} with timestamp`);
  }
};
