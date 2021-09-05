import * as functions from 'firebase-functions';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const isUp = require('is-up');

interface EnvironmentService {
  environment: string;
  url: string;
  reachable?: boolean;
}

export const updateServiceStatus = async (
  db: FirebaseFirestore.Firestore,
  environmentIds: string[],
): Promise<void> => {
  environmentIds.forEach(async envId => {
    const serviceRef = db
      .collection(`orgs/maine/environments/${envId}/services`)
      .doc('enroll');

    const serviceSnapshot = await serviceRef.get();

    const serviceDoc = serviceSnapshot.data() as EnvironmentService;

    const reachable = await isUp(serviceDoc.url);

    const batch = db.batch();

    batch.update(serviceRef, { reachable });

    const environmentRef = db.collection(`orgs/maine/environments`).doc(envId);
    batch.update(environmentRef, { reachable });

    try {
      await batch.commit();
    } catch (e) {
      functions.logger.error(
        `Could not save reachable status to ${serviceDoc.environment}, url was ${serviceDoc.url}`,
        e,
      );
    }
  });
};
