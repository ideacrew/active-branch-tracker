import { Request, Response } from 'express';
import {
  BranchDeploymentPayload,
  updateEnvironment,
  updateServiceWithBranchInfo,
} from '../../branch-deployment';
import { checkEnvironmentOwnership } from '../../check-ownership';

export const serviceDeployment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const service: BranchDeploymentPayload = req.body;

  if (service.app === undefined) {
    res.status(400).send('Service is undefined');
    return;
  }

  try {
    await checkEnvironmentOwnership(service);
    await updateEnvironment(service);
    await updateServiceWithBranchInfo(service);
  } catch (e) {
    res.status(500).send('Unable to update this service');
  }

  res
    .status(200)
    .send(
      `Successfully updated ${service.app} on ${service.org}-${service.env}`,
    );
};
