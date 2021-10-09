/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { BranchInfo } from '../../models';
import { createSafeBranchName } from '../../safeBranchName';
import { WorkflowRunPayload } from './models';

const statusIncrement: { [status: string]: number } = {
  failure: 1,
  success: 0,
};

/**
 * Handles the workflow run payload
 * @param {WorkflowRunPayload} payload
 * @return {Promise<void>}
 */
export const handleWorkflowRunEvent = async (
  payload: WorkflowRunPayload,
): Promise<void> => {
  const { workflow_run, repository, organization } = payload;

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const {
    head_branch: branchName,
    updated_at,
    conclusion: checkSuiteStatus,
  } = workflow_run;

  const safeBranchName = createSafeBranchName(branchName);

  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const { checkSuiteFailures, checkSuiteRuns } = (
    await branchRef.get()
  ).data() as BranchInfo;

  const newFailureCount = checkSuiteFailures
    ? checkSuiteFailures + statusIncrement[checkSuiteStatus]
    : 1;
  const newRunCount = checkSuiteRuns ? checkSuiteRuns + 1 : 1;
  const timestamp = new Date(updated_at).getTime();

  try {
    await branchRef.set(
      {
        checkSuiteFailures: newFailureCount,
        checkSuiteRuns: newRunCount,
        updatedAt: updated_at,
        checkSuiteStatus,
        timestamp,
      },
      { merge: true },
    );
  } catch (e) {
    functions.logger.error(e);
    return Promise.resolve();
  }
};
