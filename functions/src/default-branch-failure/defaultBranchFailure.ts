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
    const beforeBranchInfo = change.before.data() as BranchInfo;

    const afterBranchInfo = change.after.data() as BranchInfo;

    const {
      checkSuiteStatus: afterCheckSuiteStatus,
      branchName,
      repositoryName,
      organizationName,
      head_commit,
    } = afterBranchInfo;

    if (
      afterCheckSuiteStatus === 'failure' &&
      branchesToBeAlertedOn(afterBranchInfo) &&
      differentCompletionTimes(beforeBranchInfo, afterBranchInfo)
    ) {
      functions.logger.info(
        `${organizationName}/${repositoryName}/${branchName} just failed in GitHub Actions`,
      );

      const ghaLink = `https://github.com/${organizationName}/${repositoryName}/actions?query=branch%3A${encodeURI(
        branchName,
      )}`;

      const text = `⚠ <!channel> *${repositoryName}/${branchName}* just failed on <${ghaLink}|*GitHub Actions*> last commit merged by ${head_commit?.author.name} ⚠`;

      let failureMessageTimestamp;

      // Send failure message to slack channel
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

const differentCompletionTimes = (before: BranchInfo, after: BranchInfo) =>
  before.updated_at !== after.updated_at;
