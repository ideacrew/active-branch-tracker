import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const authorTeamDictionary: Record<string, string> = {
  markgoho: 'ideacrew',
};

export const databaseScript = async (): Promise<[unknown]> => {
  let scriptError;

  for (const [author, team] of Object.entries(authorTeamDictionary)) {
    const userReference = admin.firestore().collection('authors').doc(author);

    try {
      await userReference.set({ team }, { merge: true });
    } catch (error) {
      scriptError = error;
    }
  }

  return [scriptError];
};
