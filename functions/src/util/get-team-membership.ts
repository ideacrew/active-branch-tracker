import { firestore } from 'firebase-admin';

import { FSAuthor, Team } from '../models';

export const getTeamMembership = async (
  userName: string,
): Promise<Team | undefined> => {
  const database = firestore();

  const authorSnapshot = await database
    .collection('authors')
    .doc(userName)
    .get();

  const authorDocument = authorSnapshot.data() as FSAuthor;

  return authorDocument.team;
};
