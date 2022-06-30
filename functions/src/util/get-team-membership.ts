import { firestore } from 'firebase-admin';

import { FSAuthor, Team } from '../models';

export const getTeamMembership = async (
  userName: string,
): Promise<Team | undefined> => {
  const database = firestore();

  // Assuming this runs in an environment where an author
  // collection exists and has some info about which team
  // the author is on
  const authorSnapshot = await database
    .collection('authors')
    .doc(userName)
    .get();

  // If the document doesn't exist return a partial document
  const authorDocument = authorSnapshot.exists
    ? (authorSnapshot.data() as FSAuthor)
    : ({ team: 'ideacrew' } as Partial<FSAuthor>);

  return authorDocument.team;
};
