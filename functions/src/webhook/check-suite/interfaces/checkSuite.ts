import { App } from '../../interfaces/app';
import { WebhookPayload } from '../../interfaces/basePayload';
import { CheckConclusion } from '../../interfaces/checkConclusion';
import { HeadCommit } from '../../interfaces/headCommit';

export type CheckSuiteAction = 'completed' | 'requested' | 'rerequested';

export type CheckSuiteStatus = 'requested' | 'in_progress' | 'completed';

/* eslint-disable camelcase */
export interface CheckSuitePayload<T extends CheckSuiteAction>
  extends WebhookPayload {
  action: T;
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
