import { Request, Response } from 'express';
import { DataRefreshPayload, updateServiceData } from '../../data-refresh';

export const dataRefresh = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const dataRefreshPayload: DataRefreshPayload = request.body;

  const { status, app, env, org } = dataRefreshPayload;

  if (app === undefined) {
    response.status(400).send('Service is undefined');
    return;
  }

  try {
    await updateServiceData(dataRefreshPayload);
  } catch {
    response.status(500).send('Unable to update this service');
  }

  response
    .status(200)
    .send(`${status} refreshing data for ${app} on ${org}-${env}`);
};
