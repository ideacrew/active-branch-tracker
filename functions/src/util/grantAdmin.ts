import * as admin from 'firebase-admin';

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
