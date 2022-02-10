import { ImageInfo, ServiceDeploymentPayload } from '../api/models';
import {
  updateEnvironment,
  updateServiceWithBranchInfo,
} from '../branch-deployment';
import { checkEnvironmentOwnership } from '../check-ownership';
import { ServiceDeployment } from './interfaces';
import { parseImage } from './utils';

export const handleServiceDeployment = async (
  payload: ServiceDeploymentPayload,
): Promise<void> => {
  const imageInfo: ImageInfo = parseImage(payload.image);

  const { repo: repository } = imageInfo;

  const service: ServiceDeployment = {
    ...payload,
    ...imageInfo,
    app: repository,
  };

  // These should probably be in a batch commit

  await checkEnvironmentOwnership(service);
  await updateEnvironment(service);
  await updateServiceWithBranchInfo(service);
};
