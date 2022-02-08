/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import { BranchInfo, FSWorkflowRun } from '../../models';
import { createSafeBranchName } from '../../safe-branch-name';
import { getBranchReference } from '../../util';
import { calculateRuntime } from './calculate-runtime';

import { WorkflowRunPayload } from './models';
import { recordWorkflowRun } from './record-workflow-run';
import { updateWorkflowResults } from './update-workflow-results';

/**
 * Handles the workflow run payload
 * @param {WorkflowRunPayload} payload
 * @return {Promise<void>}
 */
export const handleWorkflowRunEvent = async (
  payload: WorkflowRunPayload,
): Promise<void> => {
  const { workflow_run } = payload;

  const { head_branch: unsafeBranchName, conclusion: checkSuiteStatus } =
    workflow_run;

  const branchName = createSafeBranchName(unsafeBranchName);

  if (branchName === 'trunk' && checkSuiteStatus === 'success') {
    try {
      await recordWorkflowRun(payload);
    } catch (error) {
      functions.logger.error('Could not save workflow run', error);
    }
  }

  const { action, organization, repository } = payload;
  const {
    html_url,
    id,
    workflow_id,
    run_started_at,
    name,
    conclusion,
    updated_at,
  } = workflow_run;
  const { login: organizationName } = organization;
  const { name: repositoryName } = repository;

  const runtime =
    run_started_at !== updated_at
      ? calculateRuntime(updated_at, run_started_at)
      : 0;

  const newWorkflowRun: FSWorkflowRun = {
    runId: id,
    workflowId: workflow_id,
    htmlUrl: html_url,
    runStartedAt: run_started_at,
    updatedAt: updated_at,
    runtime,
    repositoryName,
    workflowName: name,
    conclusion,
    action,
  };

  const branchReference = getBranchReference({
    organizationName,
    repositoryName,
    branchName,
  });

  const branchSnapshot = await branchReference.get();

  if (branchSnapshot.exists) {
    // Grab the workflowResults array from the data
    const { workflowResults } = branchSnapshot.data() as BranchInfo;

    const newWorkflowResults = updateWorkflowResults(
      workflowResults,
      newWorkflowRun,
    );

    try {
      await branchReference.update({ workflowResults: newWorkflowResults });
    } catch (error) {
      functions.logger.error('Could not update workflow results', error);
    }
  }

  return;
};
