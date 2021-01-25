import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export async function createNewUser(
  user: functions.auth.UserRecord,
  _context: functions.EventContext,
): Promise<void> {
  // Set custom claims
  // await setCustomClaims(user);

  // Set user document
  await addNewUserToDatabase(user);
}

const admins = ['mark.goho@ideacrew.com', 'angus.irvine@ideacrew.com'];

// const setCustomClaims = async (user: functions.auth.UserRecord) => {
//   const isAdmin = admins.includes(user.email!);
//   try {
//     functions.logger.info('Setting custom claims for', user.displayName);
//     await admin.auth().setCustomUserClaims(user.uid, {
//       admin: isAdmin,
//     });
//   } catch (e) {
//     functions.logger.error('Not able to assign custom claims', e);
//   }
// };

const addNewUserToDatabase = async (user: functions.auth.UserRecord) => {
  const isAdmin = admins.includes(user.email!);

  const newUserRef = admin.firestore().doc(`users/${user.uid}`);
  try {
    await newUserRef.set({
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      admin: isAdmin,
    });
  } catch (e) {
    functions.logger.error('Unable to add new user to database', e);
  }
};
