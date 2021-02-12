/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { YellrRole, YellrUser } from '../models';

/**
 * Sets claims on the auth object and adds the user
 * to the database
 * @param {admin.auth.UserRecord} user The auth object with user information
 */
export async function createNewUser(
  user: admin.auth.UserRecord,
): Promise<void> {
  // Set custom claims
  await setCustomClaims(user);

  // Set user document
  await addNewUserToDatabase(user);
}

const admins = ['mark.goho@ideacrew.com', 'angus.irvine@ideacrew.com'];

/**
 * Checks the user and returns an appropriate Role
 * @param {admin.auth.UserRecord} user The auth object with user information
 * @return {YellrUser} The role based on auth information
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
 * @param {admin.auth.UserRecord} user The auth object with user information
 * @return {boolean} whether the user is an IdeaCrew user
 */
const hasIdeaCrewEmail = (user: admin.auth.UserRecord): boolean =>
  user.email?.search(/@ideacrew\.com$/) !== -1;

/**
 * Checks whether the user should be an Admin
 * @param {admin.auth.UserRecord} user The auth object with user information
 * @return {boolean} whether the user is an admin
 */
const isAdmin = (user: admin.auth.UserRecord): boolean =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  admins.includes(user.email!);

/**
 * Sets claims
 * @param {admin.auth.UserRecord} user The auth object with user information
 * @return {Promise<void>}
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
 * @param {admin.auth.UserRecord} user The auth object with user information
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
 * @param {admin.auth.UserRecord} user The auth object with user information
 * @return {YellrUser} a Yellr user object
 */
const createYellrUser = (user: admin.auth.UserRecord): YellrUser => {
  return {
    email: user.email!,
    displayName: user.displayName!,
    photoURL: user.photoURL!,
    role: getRole(user),
  };
};
