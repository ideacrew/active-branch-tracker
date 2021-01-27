import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { YellrUser } from '../models';

export async function createNewUser(
  user: admin.auth.UserRecord,
  _context: functions.EventContext,
): Promise<void> {
  if (hasIdeaCrewEmail(user)) {
    await setCustomClaims(user);
  } else {
    try {
      functions.logger.info('User does not have an IdeaCrew email', user.email);
      await admin.auth().updateUser(user.uid, {
        disabled: true,
      });
    } catch (e) {
      functions.logger.error('User could not be disabled', user.uid);
    }
  }
  // Set custom claims

  // Set user document
  await addNewUserToDatabase(user);
}

const admins = ['mark.goho@ideacrew.com', 'angus.irvine@ideacrew.com'];

const hasIdeaCrewEmail = (user: admin.auth.UserRecord): boolean =>
  user.email?.search(/\@ideacrew\.com$/) !== -1;

const setCustomClaims = async (user: admin.auth.UserRecord) => {
  const isAdmin = admins.includes(user.email!);
  try {
    functions.logger.info('Setting custom claims for', user.displayName);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: isAdmin,
    });
  } catch (e) {
    functions.logger.error('Not able to assign custom claims', e);
  }
};

const addNewUserToDatabase = async (user: admin.auth.UserRecord) => {
  const newUserRef = admin.firestore().doc(`users/${user.uid}`);
  const newUser = createYellrUser(user);
  try {
    await newUserRef.set(newUser);
  } catch (e) {
    functions.logger.error('Unable to add new user to database', e);
  }
};

const createYellrUser = (user: admin.auth.UserRecord): YellrUser => {
  return {
    email: user.email!,
    displayName: user.displayName!,
    photoURL: user.photoURL!,
    admin: admins.includes(user.email!),
    disabled: !hasIdeaCrewEmail(user),
  };
};
