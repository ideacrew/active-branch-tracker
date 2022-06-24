import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const authorTeamDictionary: Record<string, string> = {
  Battula: '',
  RyanEddyIC: '',
  TreyE: '',
  harshaellanki: '',
};

export const databaseScript = async (): Promise<unknown | undefined> => {
  const batch = admin.firestore().batch();

  for (const [author, team] of Object.entries(authorTeamDictionary)) {
    const authorReference = admin.firestore().collection('authors').doc(author);
    batch.set(authorReference, { team }, { merge: true });
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
