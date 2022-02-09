import { Request, Response } from 'express';
import * as functions from 'firebase-functions';

import {
  BranchDeploymentPayload,
  // updateEnvironment,
  // updateServiceWithBranchInfo,
} from '../../branch-deployment';
// import { checkEnvironmentOwnership } from '../../check-ownership';

export const serviceDeployment = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const service: BranchDeploymentPayload = request.body;

  functions.logger.info('New service deployment', { service });

  // try {
  //   await checkEnvironmentOwnership(service);
  //   await updateEnvironment(service);
  //   await updateServiceWithBranchInfo(service);
  // } catch {
  //   response.status(500).send('Unable to update this service');
  // }

  response
    .status(200)
    .send(
      `Successfully received payload to update ${service.org}-${service.env}`,
    );
};
