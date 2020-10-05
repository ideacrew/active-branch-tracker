import * as admin from 'firebase-admin';

export async function createNewUser(
  user: admin.auth.UserRecord,
): Promise<void> {
  const { uid, email, displayName } = user;

  const newUser = {
    email,
    displayName,
    admin: false,
  };

  const newUserRef = admin.firestore().doc(`users/${uid}`);

  // Set custom claims
  await admin.auth().setCustomUserClaims(uid, {
    admin: false,
  });

  // Set user document
  await newUserRef.set(newUser);
}
