import * as functions from 'firebase-functions';

export const runScript = async (
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> => {
  const header = request.headers.authorization;

  if (header === functions.config().script.key) {
    response.status(200).send('Thanks');
  } else {
    response.status(403).send('You are unauthorized');
  }
};
