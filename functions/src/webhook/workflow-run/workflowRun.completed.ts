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
  if (payload.workflow_run.conclusion === null) {
    return Promise.resolve();
  }

  const { workflow_run, repository, organization } = payload;

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const {
    head_branch: branchName,
    updated_at,
    conclusion: checkSuiteStatus,
    head_commit,
    head_sha,
  } = workflow_run;

  const safeBranchName = createSafeBranchName(branchName);

  // Create branchRef via separate utility function
  // const branchRef = workflowRunBranchRef(payload);
  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branchDocumentSnapshot = await branchRef.get();

  if (branchDocumentSnapshot.exists) {
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
          updated_at,
          checkSuiteStatus,
          timestamp,
          head_commit,
          head_sha,
        },
        { merge: true },
      );
    } catch (e) {
      functions.logger.error(e);
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};
