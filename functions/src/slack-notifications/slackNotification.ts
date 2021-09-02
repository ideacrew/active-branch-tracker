import * as slack from 'slack';
import * as functions from 'firebase-functions';

export const sendSlackMessage = async (text: string): Promise<void> => {
  const slackConfig = functions.config().slack;
  try {
    await slack.chat.postMessage({
      token: slackConfig.token,
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
  const slackConfig = functions.config().slack;
  try {
    await slack.chat.postMessage({
      token: slackConfig.token,
      channel,
      text,
    });
  } catch (e) {
    functions.logger.error('Could not send slack message', e);
    return Promise.resolve();
  }
};
