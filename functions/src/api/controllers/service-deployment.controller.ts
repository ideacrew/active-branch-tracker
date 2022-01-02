import { Request, Response } from 'express';

import {
  BranchDeploymentPayload,
  updateEnvironment,
  updateServiceWithBranchInfo,
} from '../../branch-deployment';
import { checkEnvironmentOwnership } from '../../check-ownership';

export const serviceDeployment = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const service: BranchDeploymentPayload = request.body;

  if (service.app === undefined) {
    response.status(400).send('Service is undefined');
    return;
  }

  try {
    await checkEnvironmentOwnership(service);
    await updateEnvironment(service);
    await updateServiceWithBranchInfo(service);
  } catch {
    response.status(500).send('Unable to update this service');
  }

  response
    .status(200)
    .send(
      `Successfully updated ${service.app} on ${service.org}-${service.env}`,
    );
};
