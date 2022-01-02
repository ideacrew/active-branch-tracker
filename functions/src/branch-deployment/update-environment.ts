import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { BranchDeploymentPayload } from './branch-deployment.interface';

export const updateEnvironment = async (
  deployment: BranchDeploymentPayload,
): Promise<void> => {
  const { org, env, app, branch } = deployment;
  const FieldValue = admin.firestore.FieldValue;

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
