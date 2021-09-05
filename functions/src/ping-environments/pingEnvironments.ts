import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const isUp = require('is-up');

admin.initializeApp();

// export const pingEnvironments = async (context: functions.EventContext) => {
//   console.log(context);
//   return null;
// };

interface EnvironmentService {
  environment: string;
  url: string;
  reachable?: boolean;
}

export const pingEnvironments = async (
  _request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> => {
  const environmentIds = await getMaineEnvironments();
  await updateServiceStatus(environmentIds);

  response.status(200).send('Ping complete');
  return Promise.resolve();
};

const getMaineEnvironments = async () => {
  const db = admin.firestore();
  const environments = await db.collection('orgs/maine/environments').get();

  const environmentIds = environments.docs.map(doc => doc.id);

  return environmentIds;
};

const updateServiceStatus = async (environmentIds: string[]): Promise<void> => {
  const db = admin.firestore();
  environmentIds.forEach(async envId => {
    const serviceRef = db
      .collection(`orgs/maine/environments/${envId}/services`)
      .doc('enroll');

    const serviceSnapshot = await serviceRef.get();

    const serviceDoc = serviceSnapshot.data() as EnvironmentService;

    const reachable = await isUp(serviceDoc.url);

    await serviceRef.update({ reachable });
  });
};
