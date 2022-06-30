import * as admin from 'firebase-admin';
// eslint-disable-next-line import/no-unresolved
import { FSPullRequest } from '../models';
import { getTeamMembership } from '../util';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const databaseScript = async (): Promise<unknown | undefined> => {
  const batch = admin.firestore().batch();

  const pullRequestsCollection = admin.firestore().collection('pullRequests');
  const snapshot = await pullRequestsCollection.get();

  for (const document of snapshot.docs) {
    const prDocument = document.data() as FSPullRequest;

    const teamMembership = await getTeamMembership(prDocument.author);

    batch.update(document.ref, { team: teamMembership });
  }

  try {
    await batch.commit();
    return undefined;
  } catch (error) {
    return error;
  }
};

export interface ScriptError {
  message: string;
  error: unknown;
}
