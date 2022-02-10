import { Request, Response } from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

import { ServiceDeploymentPayload } from '../models';
import { handleServiceDeployment } from '../../service-deployment';

export const serviceDeployment = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const service: ServiceDeploymentPayload = request.body;

  try {
    await handleServiceDeployment(service);
    response
      .status(200)
      .send(
        `Successfully received payload to update ${service.org}-${service.env}`,
      );
  } catch (error) {
    functions.logger.error('Unable to update service', { error, service });
    response.status(500).send('Unable to update this service');
  }
};
