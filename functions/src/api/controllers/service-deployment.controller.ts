import { Request, Response } from 'express';
import * as functions from 'firebase-functions';

import { ServiceDeploymentPayload } from '../models';
import { handleServiceDeployment } from '../../service-deployment';

export const serviceDeployment = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const service: ServiceDeploymentPayload = request.body;

  functions.logger.info('Received service deployment', { service });

  const { status, message } = await handleServiceDeployment(service);

  if (status === 'success') {
    response
      .status(200)
      .send(
        `Successfully received payload to update ${service.org}-${service.env}`,
      );
  } else {
    functions.logger.error('Unable to update service', { message, service });
    // response.status(500).send('Unable to update this service');
    response.status(200).send('Unable to update this service');
  }
};
