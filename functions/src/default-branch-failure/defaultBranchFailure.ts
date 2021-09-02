import * as functions from 'firebase-functions';

import { BranchInfo } from '../models';
import { sendSlackMessageToChannel } from '../slack-notifications/slackNotification';

export const defaultBranchFailure = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
): Promise<null> => {
  if (change.after.exists) {
    const {
      defaultBranch,
      checkSuiteStatus,
      branchName,
      repositoryName,
      organizationName,
    } = change.after.data() as BranchInfo;

    if (checkSuiteStatus === 'failure' && defaultBranch) {
      functions.logger.info(
        `${organizationName}/${repositoryName}/${branchName} just failed in GitHub Actions`,
      );

      const ghaLink = `https://github.com/${organizationName}/${repositoryName}/actions?query=${encodeURI(
        branchName,
      )}`;

      const text = `⚠ <!channel> *${repositoryName}/${branchName}* just failed on <${ghaLink}|*GitHub Actions*> ⚠`;
      const channel = 'all_devs';

      try {
        await sendSlackMessageToChannel({ text, channel });
      } catch (e) {
        functions.logger.error(
          'Could not send branch failure message to Slack',
          e,
        );
      }
    }
  }

  return null;
};
