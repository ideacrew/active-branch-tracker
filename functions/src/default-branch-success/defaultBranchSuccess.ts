/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const FieldValue = admin.firestore.FieldValue;

import { BranchInfo } from '../models';
import {
  sendReplyToThread,
  yellrChannel,
} from '../slack-notifications/slackNotification';

export const defaultBranchSuccess = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
): Promise<null> => {
  if (change.after.exists && change.before.exists) {
    const beforeCheckSuiteStatus = (change.before.data() as BranchInfo)
      .checkSuiteStatus;

    const { checkSuiteStatus, branchName, failureMessageTimestamp } =
      change.after.data() as BranchInfo;

    // If the branch was red before but is green now, and it has a failure
    // timestamp, and it's a release branch or default branch, send a reply
    // to the thread where it originally failed that it's now green
    if (
      beforeCheckSuiteStatus === 'failure' &&
      checkSuiteStatus === 'success' &&
      failureMessageTimestamp &&
      branchesToBeAlertedOn(change.after.data() as BranchInfo)
    ) {
      const text = `${branchName} just completed a successful run and is now green.`;

      try {
        await sendReplyToThread({
          text,
          channel: yellrChannel,
          thread_ts: failureMessageTimestamp,
        });
      } catch (e) {
        functions.logger.error(
          'Could not send branch failure message to Slack',
          e,
        );
      }

      // Remove the failure timestamp now the branch is green
      try {
        await change.after.ref.update({
          failureMessageTimestamp: FieldValue.delete(),
        });
      } catch (e) {
        functions.logger.error(
          'Could not update branch failure message timestamp',
          e,
        );
      }
    } else {
      functions.logger.info('Some part of the logic failed', {
        beforeCheckSuiteStatus: beforeCheckSuiteStatus === 'failure',
        checkSuiteStatus: checkSuiteStatus === 'success',
        failureMessageTimestamp: failureMessageTimestamp,
        branch: branchesToBeAlertedOn(change.after.data() as BranchInfo),
      });
    }
  }

  return null;
};

const branchesToBeAlertedOn = (branch: BranchInfo) =>
  branch.defaultBranch ||
  branch.branchName.startsWith('release_') ||
  branch.branchName.startsWith('development_');
