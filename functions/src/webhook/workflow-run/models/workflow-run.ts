/* eslint-disable camelcase */
import { CheckSuiteConclusion, WebhookPayload } from '../../interfaces';

export interface WorkflowRunPayload extends WebhookPayload {
  action: 'requested' | 'completed';
  workflow_run: WorkflowRun;
}

// The good stuff
export interface WorkflowRun {
  conclusion: CheckSuiteConclusion | null;
  head_branch: string; // name of the branch being run
  id: number; // Unique identifier of the workflow run
  name: string; // Name of the workflow
  run_started_at: string;
  workflow_id: number; // unique workflow id?
  updated_at: string;
  html_url: string; // direct link to workflow run
}

export interface Workflow {
  id: number;
  name: string; // name of the workflow
}
