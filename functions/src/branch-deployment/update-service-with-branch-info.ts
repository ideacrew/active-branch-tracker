/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// eslint-disable-next-line import/no-unresolved
import { FieldValue } from 'firebase-admin/firestore';

import { BranchDeploymentPayload } from './branch-deployment.interface';
import { ServiceDeployment } from '../service-deployment';

export const updateServiceWithBranchInfo = async (
  deployment: BranchDeploymentPayload | ServiceDeployment,
): Promise<void> => {
  const { org, env, app, status, commit_sha, branch, user_name, repo } =
    deployment;

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
