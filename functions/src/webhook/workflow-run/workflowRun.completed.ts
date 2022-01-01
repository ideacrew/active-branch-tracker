/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { BranchInfo } from '../../models';
import { createSafeBranchName } from '../../safeBranchName';
import { WorkflowRunPayload } from './models';
import { recordWorkflowRun } from './recordWorkflowRun';
import { CheckSuiteConclusion } from '../interfaces';

const statusIncrement: StatusIncrement = {
  failure: 1,
  success: 0,
  neutral: 0,
  cancelled: 0,
  timed_out: 0,
  action_required: 0,
  stale: 0,
};

type StatusIncrement = Record<CheckSuiteConclusion, number>;

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
    head_commit,
    head_sha,
  } = workflow_run;

  if (branchName === 'trunk' && checkSuiteStatus === 'success') {
    try {
      await recordWorkflowRun(payload);
    } catch (e) {
      functions.logger.error('Could not save workflow run', e);
    }
  }

  const safeBranchName = createSafeBranchName(branchName);

  // Create branchRef via separate utility function
  // const branchRef = workflowRunBranchRef(payload);
  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branchDocumentSnapshot = await branchRef.get();

  console.log('====================');
  console.log('Hello');
  console.log('====================');

  if (branchDocumentSnapshot.exists) {
    const branchDoc = branchDocumentSnapshot.data() as BranchInfo;

    const currentFailureCount = branchDoc.checkSuiteFailures ?? 0;

    const { checkSuiteRuns } = branchDoc;

    const newFailureCount = currentFailureCount
      ? currentFailureCount + statusIncrement[checkSuiteStatus]
      : statusIncrement[checkSuiteStatus];
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
      functions.logger.error('Could not save workflow run to branch', {
        branch: safeBranchName,
        error: e,
      });
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
};
