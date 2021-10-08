import * as functions from 'firebase-functions';
import { sendSlackMessageToChannel } from '../slack-notifications/slackNotification';

/**
 * Handles the incoming webhook from GitHub Status
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 */
export async function handleGitHubStatusWebhook(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  functions.logger.log('GitHub Status Payload', request.body);

  sendSlackMessageToChannel({
    text: 'GitHub Status Changed',
    channel: 'yellr-announcements',
  });

  response.status(200).send('Thanks');
}
