/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import { BranchInfo, FSWorkflowRun } from '../../models';
import { createSafeBranchName } from '../../safe-branch-name';
import { getBranchReference, isDefaultBranch } from '../../util';
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
  const { workflow_run, organization, repository } = payload;

  const { head_branch: unsafeBranchName, conclusion: checkSuiteStatus } =
    workflow_run;

  const branchName = createSafeBranchName(unsafeBranchName);

  const defaultBranch = await isDefaultBranch({
    organizationName: organization.login,
    repositoryName: repository.name,
    branchName,
  });

  if (defaultBranch && checkSuiteStatus === 'success') {
    try {
      await recordWorkflowRun(payload);
    } catch (error) {
      functions.logger.error('Could not save workflow run', error);
    }
  }

  const { action } = payload;
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
    const branchDocument = branchSnapshot.data() as BranchInfo;

    // Existing branches won't have this property
    const workflowResults = branchDocument.workflowResults ?? [];

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
