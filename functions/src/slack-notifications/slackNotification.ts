import { WebClient } from '@slack/web-api';
import * as functions from 'firebase-functions';

const slackConfig = functions.config().slack;
const token: string = slackConfig.token;

const slack = new WebClient(token);

export const sendSlackMessage = async (text: string): Promise<void> => {
  try {
    await slack.chat.postMessage({
      channel: 'environment-management',
      text,
    });
  } catch (e) {
    functions.logger.error('Could not send slack message', e);
    return Promise.resolve();
  }
};

export const sendSlackMessageToChannel = async ({
  text,
  channel,
}: {
  text: string;
  channel: string;
}): Promise<void> => {
  try {
    const response = await slack.chat.postMessage({
      channel,
      text,
    });

    functions.logger.log('Message sent', response);
  } catch (e) {
    functions.logger.error('Could not send slack message', e);
    return Promise.resolve();
  }
};
