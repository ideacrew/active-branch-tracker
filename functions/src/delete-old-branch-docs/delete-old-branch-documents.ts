import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Handles a data refresh
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 * @return {Promise<void>}
 */
export async function deleteOldBranchDocuments(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  const today = Date.now();

  const oneDayInMs = 1000 * 60 * 60 * 24;
  const ninetyDaysInMs = 90 * oneDayInMs;
  const ninetyDaysAgo = today - ninetyDaysInMs;

  const branchesReference = admin.firestore().collection('branches');
  const snapshot = await branchesReference
    .where('defaultBranch', '==', false)
    .where('timestamp', '<', ninetyDaysAgo)
    .limit(100)
    .get();

  const numberOfOldBranches = snapshot.size;

  if (numberOfOldBranches > 0) {
    const batch = admin.firestore().batch();
    // eslint-disable-next-line unicorn/no-array-for-each
    snapshot.forEach(branch => batch.delete(branch.ref));

    try {
      await batch.commit();
    } catch (error) {
      functions.logger.error('Error deleting branches', error);
      response.send(error);
    }
    response
      .status(200)
      .send(`${numberOfOldBranches} branches successfully deleted`);
  } else {
    response.status(200).send('No branches to delete');
  }
}
