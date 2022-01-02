import * as admin from 'firebase-admin';

import { OrgEnvironment } from '../models';

export const checkOwnership = async ({
  org,
  env,
}: {
  org: string;
  env: string;
}): Promise<boolean> => {
  const environmentReference = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase());

  const environmentDocument = await environmentReference.get();

  if (environmentDocument.exists) {
    const { owner } = environmentDocument.data() as OrgEnvironment;
    // console.log('Owner is', owner !== 'Open');
    return owner !== 'Open' || owner === undefined;
  } else {
    return false;
  }
};
