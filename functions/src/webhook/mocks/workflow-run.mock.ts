/* eslint-disable camelcase */
/* eslint-disable unicorn/no-null */
import { mockBaseWebhookPayload } from '.';
import { WorkflowRun, WorkflowRunPayload } from '../workflow-run';

export interface MockWorkflowRun {
  requested: WorkflowRunPayload;
  success: WorkflowRunPayload;
  failure: WorkflowRunPayload;
}

export const mockWorkflowRun = (
  workflowName = 'test',
  workflowId = 1,
  head_branch = 'feature-branch',
): MockWorkflowRun => {
  const startedAt = new Date();
  const finishedAt = new Date(startedAt.getTime() + 100_000).toISOString();

  const workflowRun: WorkflowRun = {
    id: 1,
    workflow_id: workflowId,
    conclusion: null,
    head_branch,
    name: workflowName,
    run_started_at: startedAt.toISOString(),
    html_url: 'https://github.com',
    updated_at: startedAt.toISOString(),
  };

  const requested: WorkflowRunPayload = {
    action: 'requested',
    workflow_run: { ...workflowRun, id: 2 },
    ...mockBaseWebhookPayload,
  };
  const success: WorkflowRunPayload = {
    action: 'completed',
    workflow_run: {
      ...workflowRun,
      conclusion: 'success',
      updated_at: finishedAt,
    },
    ...mockBaseWebhookPayload,
  };
  const failure: WorkflowRunPayload = {
    action: 'completed',
    workflow_run: {
      ...workflowRun,
      id: 3,
      conclusion: 'failure',
      updated_at: finishedAt,
    },
    ...mockBaseWebhookPayload,
  };

  return {
    requested,
    success,
    failure,
  };
};
