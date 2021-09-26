import { WebClient } from '@slack/web-api';
import * as functions from 'firebase-functions';

const slackConfig = functions.config().slack;
const token: string = slackConfig.token;

const slack = new WebClient(token);

export const sendSlackMessage = async (text: string): Promise<void> => {
  try {
    await slack.chat.postMessage({
      token,
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
    await slack.chat.postMessage({
      token,
      channel,
      text,
    });
  } catch (e) {
    functions.logger.error('Could not send slack message', e);
    return Promise.resolve();
  }
};
