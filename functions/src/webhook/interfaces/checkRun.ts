/* eslint-disable camelcase */
import { App } from './app';
import { WebhookPayload } from './basePayload';
import { CheckSuiteConclusion } from './checkConclusion';

export interface CheckRunPayload extends WebhookPayload {
  action: 'created' | 'completed' | 'rerequested' | 'requested_action';
  check_run: CheckRun;
}

export type CheckRunStatus = 'queued' | 'in_progress' | 'completed';

export interface CheckRun {
  id: number;
  node_id: string;
  head_sha: string;
  external_id: string;
  url: string;
  html_url: string;
  details_url: string;
  status: CheckRunStatus;
  conclusion: CheckSuiteConclusion;
  started_at: string;
  completed_at: string;
  output: {
    title: null;
    summary: null;
    text: null;
    annotations_count: 0;
    annotations_url: string;
  };
  name: string; // this is what I want
  check_suite: {
    id: number; // check suite id that holds this check run
    node_id: string;
    head_branch: string;
    head_sha: string;
    status: string;
    conclusion: null;
    url: string;
    before: string;
    after: string;
    pull_requests: [];
    app: App;
    created_at: string;
    updated_at: string;
  };
  app: App;
  pull_requests: [];
}
