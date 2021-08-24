import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Handles a data refresh
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 * @return {Promise<void>}
 */
export async function deleteOldBranchDocs(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  const today = new Date().getTime();

  const oneDayInMs = 1000 * 60 * 60 * 24;
  const ninetyDaysInMs = 90 * oneDayInMs;
  const ninetyDaysAgo = today - ninetyDaysInMs;

  const branchesRef = admin.firestore().collection('branches');
  const snapshot = await branchesRef
    .where('defaultBranch', '==', false)
    .where('timestamp', '<', ninetyDaysAgo)
    .limit(100)
    .get();

  const numberOfOldBranches = snapshot.size;

  if (numberOfOldBranches > 0) {
    console.log(`There are ${numberOfOldBranches} old branches.`);
    const batch = admin.firestore().batch();
    snapshot.forEach(branch => batch.delete(branch.ref));

    await batch.commit();
    response
      .status(200)
      .send(`${numberOfOldBranches} branches successfully deleted`);
  } else {
    response.status(200).send('No branches to delete');
  }
}
