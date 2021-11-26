import * as admin from 'firebase-admin';

import { OrgEnvironment } from '../models';

export const checkOwnership = async ({
  org,
  env,
}: {
  org: string;
  env: string;
}): Promise<boolean> => {
  const envRef = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase());

  const envDoc = await envRef.get();

  if (envDoc.exists) {
    const { owner } = envDoc.data() as OrgEnvironment;
    // console.log('Owner is', owner !== 'Open');
    return owner !== 'Open' || owner === undefined;
  } else {
    return false;
  }
};
