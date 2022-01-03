/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { BranchInfo } from '../../models';
import { createSafeBranchName } from '../../safe-branch-name';
import { WorkflowRunPayload } from './models';
import { recordWorkflowRun } from './record-workflow-run';
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
    } catch (error) {
      functions.logger.error('Could not save workflow run', error);
    }
  }

  const safeBranchName = createSafeBranchName(branchName);

  // Create branchRef via separate utility function
  // const branchRef = workflowRunBranchRef(payload);
  const branchReference = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branchDocumentSnapshot = await branchReference.get();

  if (branchDocumentSnapshot.exists) {
    const branchDocument = branchDocumentSnapshot.data() as BranchInfo;

    const currentFailureCount = branchDocument.checkSuiteFailures ?? 0;

    const { checkSuiteRuns } = branchDocument;

    const newFailureCount = currentFailureCount
      ? currentFailureCount + statusIncrement[checkSuiteStatus]
      : statusIncrement[checkSuiteStatus];
    const newRunCount = checkSuiteRuns ? checkSuiteRuns + 1 : 1;
    const timestamp = new Date(updated_at).getTime();

    try {
      await branchReference.set(
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
    } catch (error) {
      functions.logger.error('Could not save workflow run to branch', {
        branch: safeBranchName,
        error: error,
      });
      return;
    }
  } else {
    return;
  }
};
