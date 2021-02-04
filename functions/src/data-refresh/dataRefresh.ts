import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export type AppName = 'enroll' | 'gluedb';
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
  dataTimestamp: FirebaseFirestore.FieldValue;
}

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
