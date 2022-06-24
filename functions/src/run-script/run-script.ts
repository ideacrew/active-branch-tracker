import * as functions from 'firebase-functions';
import { databaseScript } from './database-script';

export const runScript = async (
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> => {
  const scriptKey = request.headers.authorization;
  const functionsKey: string = functions.config().script?.key;

  // In local development both of these will be undefined
  // Otherwise, they will have values and need to match
  if (scriptKey === functionsKey) {
    const error = await databaseScript();

    if (error !== undefined) {
      response.status(500).send({ error });
    } else {
      response.status(200).send('Script ran successfully');
    }
  } else {
    response.status(403).send('You are unauthorized');
  }
};
