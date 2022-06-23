import * as functions from 'firebase-functions';
import { databaseScript } from './database-script';

export const runScript = async (
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> => {
  const scriptKey = request.headers.authorization ?? '';

  const functionsKey = functions.config().script?.key ?? '';

  if (scriptKey === functionsKey) {
    const [success, error] = await databaseScript();

    response.status(200).send('Thanks');
  } else {
    response.status(403).send('You are unauthorized');
  }
};
