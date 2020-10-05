import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firestore = admin.firestore();

export async function enableAdminForUser(
  data: any,
  context: functions.https.CallableContext,
) {
  if (context.auth && context.auth.token.admin !== true) {
    return {
      error:
        'Request not authorized. User must be an admin to fulfill request.',
    };
  }
  const uid: string = data.uid;
  await grantAdminRole(uid);
  return {
    result: `Request fulfilled! ${uid} is now an admin.`,
  };
}
