import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export async function deleteUser(
  user: admin.auth.UserRecord,
  _context: functions.EventContext,
): Promise<void> {
  try {
    functions.logger.info('Deleting user', user.uid);
    await admin.auth().deleteUser(user.uid);
  } catch (e) {
    functions.logger.error('Could not delete user', user.uid, e);
  }
}
