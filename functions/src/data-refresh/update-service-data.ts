/* eslint-disable camelcase */

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// eslint-disable-next-line import/no-unresolved
import { FieldValue } from 'firebase-admin/firestore';

import { checkOwnership } from '../check-ownership';
import { sendSlackMessage } from '../slack-notifications';
import { yellrEnvironmentLink as yellrEnvironmentLink } from '../util';
import { DataRefreshPayload } from './models';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const updateServiceData = async (
  dataRefreshPayload: DataRefreshPayload,
): Promise<void> => {
  const { app, status, env, org, user_name } = dataRefreshPayload;

  const serviceReference = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase())
    .collection('services')
    .doc(app);

  const ownedEnvironment = await checkOwnership({ org, env });
  const yellrLink = yellrEnvironmentLink({ org, env });
  if (!ownedEnvironment) {
    await sendSlackMessage(
      `⚠ <!channel> <${yellrLink}|*${org}-${env.toLowerCase()}*> is having its data refreshed with _no current owner_! ⚠`,
    );
  }

  try {
    await serviceReference.set(
      {
        data: {
          status,
          user_name,
          dataTimestamp: FieldValue.serverTimestamp(),
        },
      },
      { merge: true },
    );
  } catch (error) {
    functions.logger.error('Could not set data refresh information', error);
  }
};
