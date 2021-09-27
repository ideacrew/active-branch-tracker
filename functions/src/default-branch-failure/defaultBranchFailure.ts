/* eslint-disable camelcase */
import * as functions from 'firebase-functions';

import { BranchInfo } from '../models';
import {
  sendSlackMessageToChannel,
  yellrChannel,
} from '../slack-notifications/slackNotification';

export const defaultBranchFailure = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
): Promise<null> => {
  if (change.after.exists) {
    const {
      checkSuiteStatus,
      branchName,
      repositoryName,
      organizationName,
      head_commit,
    } = change.after.data() as BranchInfo;

    if (
      checkSuiteStatus === 'failure' &&
      branchesToBeAlertedOn(change.after.data() as BranchInfo)
    ) {
      functions.logger.info(
        `${organizationName}/${repositoryName}/${branchName} just failed in GitHub Actions`,
      );

      const ghaLink = `https://github.com/${organizationName}/${repositoryName}/actions?query=${encodeURI(
        branchName,
      )}`;

      const text = `⚠ <!channel> *${repositoryName}/${branchName}* just failed on <${ghaLink}|*GitHub Actions*> last commit merged by ${head_commit?.author.name} ⚠`;

      let failureMessageTimestamp;

      try {
        failureMessageTimestamp = await sendSlackMessageToChannel({
          text,
          channel: yellrChannel,
        });
      } catch (e) {
        functions.logger.error(
          'Could not send branch failure message to Slack',
          e,
        );
      }

      // Set the timestamp of the failure message in the branch info document
      try {
        await change.after.ref.set(
          {
            failureMessageTimestamp,
          },
          { merge: true },
        );
      } catch (e) {
        functions.logger.error(
          'Could not update branch failure message timestamp',
          e,
        );
      }
    }
  }

  return null;
};

const branchesToBeAlertedOn = (branch: BranchInfo) =>
  branch.defaultBranch || branch.branchName.startsWith('release_');
