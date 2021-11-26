/* eslint-disable camelcase */

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { checkOwnership } from '../check-ownership';
import { sendSlackMessage } from '../slack-notifications';
import { yellrEnvLink } from '../util';
import { DataRefreshPayload } from './models';

admin.initializeApp();

export const updateServiceData = async (
  dataRefreshPayload: DataRefreshPayload,
): Promise<void> => {
  const { app, status, env, org, user_name } = dataRefreshPayload;

  const serviceRef = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase())
    .collection('services')
    .doc(app);

  const ownedEnvironment = await checkOwnership({ org, env });
  const yellrLink = yellrEnvLink({ org, env });
  if (!ownedEnvironment) {
    await sendSlackMessage(
      `⚠ <!channel> <${yellrLink}|*${org}-${env.toLowerCase()}*> is having its data refreshed with _no current owner_! ⚠`,
    );
  }

  const FieldValue = admin.firestore.FieldValue;

  try {
    await serviceRef.set(
      {
        data: {
          status,
          user_name,
          dataTimestamp: FieldValue.serverTimestamp(),
        },
      },
      { merge: true },
    );
  } catch (e) {
    functions.logger.error('Could not set data refresh information', e);
  }
};
