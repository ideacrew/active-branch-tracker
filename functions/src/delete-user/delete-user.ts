import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export async function deleteUser(
  user: admin.auth.UserRecord,
  _context: functions.EventContext,
): Promise<void> {
  try {
    functions.logger.info('Deleting user', user.uid);
    await admin.firestore().collection('users').doc(user.uid).delete();
  } catch (e) {
    functions.logger.error('Could not delete user', user.uid, e);
  }
}
