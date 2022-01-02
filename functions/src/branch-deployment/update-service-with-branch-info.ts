/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { BranchDeploymentPayload } from './branch-deployment.interface';

export const updateServiceWithBranchInfo = async (
  deployment: BranchDeploymentPayload,
): Promise<void> => {
  const { org, env, app, status, commit_sha, branch, user_name, repo } =
    deployment;

  const FieldValue = admin.firestore.FieldValue;

  const serviceReference = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase())
    .collection('services')
    .doc(app);

  try {
    await serviceReference.set(
      {
        latestDeployment: {
          branch,
          commit_sha,
          user_name,
          status,
          repo,
          [status]: FieldValue.serverTimestamp(),
        },
      },
      { merge: true },
    );
  } catch {
    functions.logger.error(
      `Could not set latest deployment on ${org}-${env} ${app}`,
    );
  }
};
