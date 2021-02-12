import * as functions from 'firebase-functions';

import { grantAdminRole } from './util/grantAdmin';

/**
 *
 * @param {unknown} data
 * @param {functions.https.CallableContext} context
 * @return {Promise<any>}
 */
export async function enableAdminForUser(
  data: unknown,
  context: functions.https.CallableContext,
): Promise<{ result: string }> {
  if (context.auth && context.auth.token.admin !== true) {
    return {
      result:
        'Request not authorized. User must be an admin to fulfill request.',
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uid: string = (data as any).uid;
  await grantAdminRole(uid);
  return {
    result: `Request fulfilled! ${uid} is now an admin.`,
  };
}
