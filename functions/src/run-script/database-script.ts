import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

type Team =
  | 'maintenance'
  | 'coderush'
  | 'ideacrew'
  | 'inpodnito'
  | 'integration'
  | 'load-aim-fire'
  | 'podigy';

const authorTeamDictionary: Record<string, Team> = {
  Battula: 'maintenance',
  RyanEddyIC: 'podigy',
  TreyE: 'integration',
  harshaellanki: 'load-aim-fire',
  ipublic: 'ideacrew',
  j1joey: 'maintenance',
  jacobkagon: 'maintenance',
  jayreddy519: 'podigy',
  kristinmerbach: 'inpodnito',
  mdkaraman: 'inpodnito',
  nisanthyaganti9: 'load-aim-fire',
  polographer: 'inpodnito',
  raghuramg: 'maintenance',
  saikumar9: 'load-aim-fire',
  saimekala07: 'integration',
  scaustin34: 'inpodnito',
  utkarsh7989: 'coderush',
  vkghub: 'load-aim-fire',
  ymhari: 'podigy',
};

export const databaseScript = async (): Promise<unknown | undefined> => {
  const batch = admin.firestore().batch();

  for (const [author, team] of Object.entries(authorTeamDictionary)) {
    const authorReference = admin.firestore().collection('authors').doc(author);
    const teamReference = admin.firestore().collection('teams').doc(team);

    batch.update(teamReference, {
      members: admin.firestore.FieldValue.arrayUnion(author),
    });
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
