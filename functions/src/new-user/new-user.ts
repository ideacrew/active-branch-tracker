import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { YellrRole, YellrUser } from '../models';

/**
 * Sets claims on the auth object and adds the user
 * to the database
 * @param user The auth object with user information
 * @param _context unused here
 */
export async function createNewUser(
  user: admin.auth.UserRecord,
  _context: functions.EventContext,
): Promise<void> {
  // Set custom claims
  await setCustomClaims(user);

  // Set user document
  await addNewUserToDatabase(user);
}

const admins = ['mark.goho@ideacrew.com', 'angus.irvine@ideacrew.com'];

/**
 * Checks the user and returns an appropriate Role
 * @param user The auth object with user information
 * @returns {YellrUser} The role based on auth information
 */
const getRole = (user: admin.auth.UserRecord): YellrRole => {
  let role: YellrRole = 'disabled';

  if (hasIdeaCrewEmail(user)) {
    role = isAdmin(user) ? 'admin' : 'user';
  }

  return role;
};

/**
 * Checks the email for an @ideacrew.com domain
 * @param user The auth object with user information
 * @returns {boolean} whether the user is an IdeaCrew user
 */
const hasIdeaCrewEmail = (user: admin.auth.UserRecord): boolean =>
  user.email?.search(/\@ideacrew\.com$/) !== -1;

/**
 * Checks whether the user should be an Admin
 * @param user The auth object with user information
 * @returns {boolean} whether the user is an admin
 */
const isAdmin = (user: admin.auth.UserRecord): boolean =>
  admins.includes(user.email!);

/**
 *
 * @param user The auth object with user information
 */
const setCustomClaims = async (user: admin.auth.UserRecord): Promise<void> => {
  try {
    functions.logger.info('Setting custom claims for', user.displayName);
    await admin.auth().setCustomUserClaims(user.uid, {
      role: getRole(user),
    });
  } catch (e) {
    functions.logger.error('Not able to assign custom claims', e);
  }
};

/**
 * Adds a new Yellr user object to the database
 * @param user The auth object with user information
 */
const addNewUserToDatabase = async (user: admin.auth.UserRecord) => {
  const newUserRef = admin.firestore().doc(`users/${user.uid}`);
  const newUser = createYellrUser(user);
  try {
    functions.logger.info('Adding new user to database', user.email);
    await newUserRef.set(newUser);
  } catch (e) {
    functions.logger.error('Unable to add new user to database', e);
  }
};

/**
 * Creates a Yellr user object for insertion into database
 * @param user The auth object with user information
 * @returns {YellrUser} a Yellr user object
 */
const createYellrUser = (user: admin.auth.UserRecord): YellrUser => {
  return {
    email: user.email!,
    displayName: user.displayName!,
    photoURL: user.photoURL!,
    role: getRole(user),
  };
};
