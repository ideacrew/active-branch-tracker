import * as functions from 'firebase-functions';

import { slack } from '../slack-notifications';
import { isIncident } from './check-for-incident';

/**
 * Handles the incoming webhook from GitHub Status
 * @param {functions.https.Request} request
 * @param {functions.Response<unknown>} response
 */
export async function handleGitHubStatusWebhook(
  request: functions.https.Request,
  response: functions.Response<unknown>,
): Promise<void> {
  if (isIncident(request.body)) {
    const { incident } = request.body;
    await slack.chat.postMessage({
      channel: 'all_devs',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*GitHub Incident*',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${incident.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Status:*\n${incident.status}`,
            },
          ],
        },
      ],
    });
  }

  response.status(200).send('Thanks');
}
