import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

/**
 * Sets custom claims
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 * @return {Promise<void>}
 */
export async function handleCustomClaims(): Promise<void> {
  let icUid = '';
  let dcUid = '';

  try {
    const icUser = await admin.auth().getUserByEmail('yellr@ideacrew.com');
    const dcUser = await admin.auth().getUserByEmail('yellr@dchbx.org');
    icUid = icUser.uid;
    dcUid = dcUser.uid;
  } catch (e) {
    functions.logger.error('Could not retrieve user by email', e);
  }

  try {
    await admin.auth().setCustomUserClaims(icUid, { role: 'admin' });
    await admin.auth().setCustomUserClaims(dcUid, { role: 'external' });
  } catch (e) {
    functions.logger.error('Could not assign claim to user', e);
  }
}
