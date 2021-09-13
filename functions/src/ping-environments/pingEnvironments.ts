import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { updateServiceStatus } from './updateServiceStatus';

// eslint-disable-next-line @typescript-eslint/no-var-requires

admin.initializeApp();

export const pingEnvironmentsCron = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: functions.EventContext,
): Promise<null> => {
  await updateMaineEnvironments();
  return null;
};

export const pingEnvironmentsHttp = async (
  _request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> => {
  await updateMaineEnvironments();

  response.status(200).send('Ping complete');
};

export const pingEnvironmentsCallable = async (
  data: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: functions.https.CallableContext,
): Promise<unknown> => {
  await updateMaineEnvironments();

  return { data };
};

const updateMaineEnvironments = async () => {
  const db = admin.firestore();
  const environmentIds = await getMaineEnvironments();
  await updateServiceStatus(db, environmentIds);
};

const getMaineEnvironments = async () => {
  const db = admin.firestore();
  const environments = await db.collection('orgs/maine/environments').get();

  const environmentIds = environments.docs.map(doc => doc.id);

  return environmentIds;
};
