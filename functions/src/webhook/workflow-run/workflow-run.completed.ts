/* eslint-disable camelcase */
import * as functions from 'firebase-functions';

import { WorkflowRunPayload } from './models';
import { recordWorkflowRun } from './record-workflow-run';

/**
 * Handles the workflow run payload
 * @param {WorkflowRunPayload} payload
 * @return {Promise<void>}
 */
export const handleWorkflowRunEvent = async (
  payload: WorkflowRunPayload,
): Promise<void> => {
  const { workflow_run } = payload;

  const { head_branch: branchName, conclusion: checkSuiteStatus } =
    workflow_run;

  if (branchName === 'trunk' && checkSuiteStatus === 'success') {
    try {
      await recordWorkflowRun(payload);
    } catch (error) {
      functions.logger.error('Could not save workflow run', error);
    }
  }

  return;
};
