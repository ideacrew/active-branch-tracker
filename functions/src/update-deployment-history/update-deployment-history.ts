import * as admin from 'firebase-admin';

import { ServiceDeployment } from '../service-deployment';

export const updateDeploymentHistory = (
  serviceDeployment: ServiceDeployment,
) => {
  const { org, env, app } = serviceDeployment;

  const deploymentDocumentReference = admin
    .firestore()
    .collection('orgs')
    .doc(org)
    .collection('environments')
    .doc(env.toLowerCase())
    .collection('services')
    .doc(app)
    .collection('deployments')
    .doc();

  return {
    deploymentDocumentReference,
  };
};
