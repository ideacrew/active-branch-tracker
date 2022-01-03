/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebClient } from '@slack/web-api';
import * as functions from 'firebase-functions';
import { demoEnvironment } from '../util';

export const yellrChannel = 'all_devs';

const slackConfig = demoEnvironment()
  ? { token: 'fake-token' }
  : functions.config().slack;
const token: string = slackConfig.token;

const slack = new WebClient(token);

export const sendSlackMessage = async (text: string): Promise<void> => {
  if (demoEnvironment()) {
    return;
  }

  try {
    await slack.chat.postMessage({
      channel: 'environment-management',
      text,
    });
  } catch (error) {
    functions.logger.error('Could not send slack message', error);
    return;
  }
};

export const sendSlackMessageToChannel = async ({
  text,
  channel,
}: {
  text: string;
  channel: string;
}): Promise<string> => {
  if (demoEnvironment()) {
    return '';
  }

  try {
    const response = await slack.chat.postMessage({
      channel,
      text,
    });

    return response.ts ?? 'Response had no timestamp';
  } catch (error) {
    functions.logger.error('Could not send slack message', error);
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
  } catch (error) {
    functions.logger.error(
      'Could not send slack message reply to thread',
      error,
    );
  }
};
