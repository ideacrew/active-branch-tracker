import * as admin from 'firebase-admin';

export async function createNewUser(
  user: admin.auth.UserRecord,
): Promise<void> {
  const { uid, email, displayName, photoURL } = user;

  const newUser = {
    email,
    displayName,
    photoURL,
  };

  const newUserRef = admin.firestore().doc(`users/${uid}`);

  await newUserRef.set(newUser);
}
