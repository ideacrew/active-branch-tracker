/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { checkOwnership } from '../check-ownership/checkOwnership';
import { sendSlackMessage } from '../slack-notifications/slackNotification';
import { yellrEnvLink } from '../util/yellrEnvLink';

admin.initializeApp();

export type AppName = 'enroll' | 'glue';
export type DataRefreshStatus = 'started' | 'completed' | 'error';

export interface DataRefreshPayload {
  app: AppName;
  status: DataRefreshStatus;
  env: string;
  org: string;
  user_name: string;
}

export interface AppData {
  status: DataRefreshStatus;
  user_name: string;
  dataTimestamp: FirebaseFirestore.Timestamp;
}

/**
 * Handles a data refresh
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 * @return {Promise<void>}
 */
export async function handleDataRefresh(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  const dataRefreshPayload: DataRefreshPayload = JSON.parse(
    request.body.payload,
  );

  const { app, status, env, org, user_name } = dataRefreshPayload;

  const envRef = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env);

  if (status === 'started') {
    const ownedEnvironment = await checkOwnership({ org, env });
    const yellrLink = yellrEnvLink({ org, env });
    if (!ownedEnvironment) {
      await sendSlackMessage(
        `⚠ <!channel> <${yellrLink}|*${org}-${env}*> is having its data refreshed with _no current owner_! ⚠`,
      );
    }

    try {
      const FieldValue = admin.firestore.FieldValue;
      await envRef.set(
        {
          [app]: {
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
  } else if (status === 'completed') {
    try {
      // Dot notation for updating a nested object
      await envRef.update({
        [`${app}.status`]: status,
      });
    } catch (e) {
      functions.logger.error('Could not set data refresh information', e);
    }
  } else {
    functions.logger.error(
      'There was an error in the payload',
      dataRefreshPayload,
    );
  }

  response.status(200).send(dataRefreshPayload);
}
