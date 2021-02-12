/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from 'firebase-admin';

/**
 * Grants a user the Admin role
 * @param {string} uid the user ID
 * @return {Promise<any>} a promise
 */
export async function grantAdminRole(uid: string): Promise<any> {
  const user: admin.auth.UserRecord = await admin.auth().getUser(uid);
  if (user.customClaims && (user.customClaims as any).admin === true) {
    return Promise.resolve();
  }

  await admin.auth().setCustomUserClaims(uid, {
    admin: true,
  });

  const userRef = admin.firestore().doc(`users/${uid}`);
  return userRef.update({ admin: true });
}
