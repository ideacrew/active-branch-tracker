/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebClient } from '@slack/web-api';
import * as functions from 'firebase-functions';

export const yellrChannel = 'all_devs';

const slackConfig = process.env.FUNCTIONS_EMULATOR
  ? { token: 'fake-token' }
  : functions.config().slack;
const token: string = slackConfig.token;

const slack = new WebClient(token);

export const sendSlackMessage = async (text: string): Promise<void> => {
  if (process.env.FUNCTIONS_EMULATOR) {
    return Promise.resolve();
  }

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
}): Promise<string> => {
  if (process.env.FUNCTIONS_EMULATOR) {
    return '';
  }

  try {
    const response = await slack.chat.postMessage({
      channel,
      text,
    });

    return response.ts ?? 'Response had no timestamp';
  } catch (e) {
    functions.logger.error('Could not send slack message', e);
    return 'Did not send';
  }
};

export const sendReplyToThread = async ({
  text,
  channel,
  thread_ts,
}: {
  text: string;
  channel: string;
  thread_ts: string;
}): Promise<void> => {
  try {
    await slack.chat.postMessage({
      channel,
      text,
      thread_ts,
    });
  } catch (e) {
    functions.logger.error('Could not send slack message reply to thread', e);
  }
};
