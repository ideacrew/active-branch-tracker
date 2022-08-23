import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

import { ImageInfo, ServiceDeploymentPayload } from '../api/models';
import {
  updateEnvironment,
  updateServiceWithBranchInfo,
} from '../branch-deployment';
import { checkEnvironmentOwnership } from '../check-ownership';
import { updateDeploymentHistory } from '../update-deployment-history';
import { ServiceDeployment } from './interfaces';
import { parseImage } from './utils';

export const handleServiceDeployment = async (
  payload: ServiceDeploymentPayload,
): Promise<{ status: string; message: unknown }> => {
  logger.info(`Received service deployment: ${payload.image}`);
  const imageInfo: ImageInfo = parseImage(payload.image);

  const { repo: repository } = imageInfo;

  const serviceDeployment: ServiceDeployment = {
    ...payload,
    ...imageInfo,
    app: repository,
  };

  const FieldValue = admin.firestore.FieldValue;

  // These should probably be in a batch commit

  await checkEnvironmentOwnership(serviceDeployment);
  await updateEnvironment(serviceDeployment);
  await updateServiceWithBranchInfo(serviceDeployment);

  // Add deployment to history underneath service
  const batch = admin.firestore().batch();

  const { deploymentDocumentReference } =
    updateDeploymentHistory(serviceDeployment);

  batch.create(deploymentDocumentReference, {
    ...serviceDeployment,
    completed: FieldValue.serverTimestamp(),
  });

  try {
    console.log('Writing batch commit');
    await batch.commit();

    return { status: 'success', message: 'Updated service' };
  } catch (error) {
    console.log('Failed writing batch commit');

    return { status: 'error', message: error };
  }
};
