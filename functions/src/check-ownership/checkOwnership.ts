import * as admin from 'firebase-admin';
import { DeploymentEnvironment } from '../deployment-environment';

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
    const { owner } = envDoc.data() as DeploymentEnvironment;
    // console.log('Owner is', owner !== 'Open');
    return owner !== 'Open' || owner === undefined;
  } else {
    return false;
  }
};
