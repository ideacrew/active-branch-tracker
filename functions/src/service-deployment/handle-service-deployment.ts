import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

// eslint-disable-next-line import/no-unresolved
import { FieldValue } from 'firebase-admin/firestore';

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
  // Could be [public.ecr.aws/ideacrew/enroll:trunk-48132c8]
  const rawImageName = payload.image;

  const properImageName =
    rawImageName.at(0) === '[' ? rawImageName.slice(1, -1) : rawImageName;

  if (properImageName.includes(' ')) {
    logger.error('Image name contains two images');
    return { status: 'error', message: 'Image name contains two images' };
  }

  const imageInfo: ImageInfo = parseImage(properImageName);

  const { repo: repository } = imageInfo;

  const serviceDeployment: ServiceDeployment = {
    ...payload,
    image: properImageName,
    ...imageInfo,
    app: repository,
  };

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
