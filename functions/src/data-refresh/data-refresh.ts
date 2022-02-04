/* eslint-disable camelcase */
import * as functions from 'firebase-functions';

import { DataRefreshPayload } from './models';
import { updateServiceData } from './update-service-data';

/**
 * Handles a data refresh
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 * @return {Promise<void>}
 */
export async function handleDataRefresh(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  const dataRefreshPayload: DataRefreshPayload = JSON.parse(
    request.body.payload,
  );

  await updateServiceData(dataRefreshPayload);

  response.status(200).send(dataRefreshPayload);
}
