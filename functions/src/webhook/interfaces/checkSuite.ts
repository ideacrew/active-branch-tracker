import { App } from './app';
import { WebhookPayload } from './basePayload';
import { CheckConclusion } from './checkConclusion';
import { HeadCommit } from './headCommit';

export type CheckSuiteAction = 'completed' | 'requested' | 'rerequested';

export type CheckSuiteStatus = 'requested' | 'in_progress' | 'completed';

/* eslint-disable camelcase */
export interface CheckSuitePayload extends WebhookPayload {
  action: CheckSuiteAction;
  check_suite: CheckSuite;
}

export interface CheckSuite {
  id: number;
  node_id: string;
  head_branch: string;
  head_sha: string;
  status: CheckSuiteStatus;
  conclusion: CheckConclusion;
  url: string;
  before: string;
  after: string;
  pull_requests: unknown[];
  app: App;
  created_at: string;
  updated_at: string;
  latest_check_runs_count: number;
  check_runs_url: string;
  head_commit: HeadCommit;
}
