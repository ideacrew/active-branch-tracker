import * as admin from 'firebase-admin';
import { WebhookPayload, App } from './webhookPayload';
import { CheckConclusion } from './checkConclusion';

export interface CheckRunPayload extends WebhookPayload {
  action: 'created' | 'completed' | 'rerequested' | 'requested_action';
  check_run: CheckRun;
}

export enum CheckRunStatus {
  Queued = 'queued',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export interface CheckRun {
  id: number;
  node_id: string;
  head_sha: string;
  external_id: string;
  url: string;
  html_url: string;
  details_url: string;
  status: CheckRunStatus;
  conclusion: CheckConclusion;
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

export async function handleCheckRunEvent(
  payload: CheckRunPayload
): Promise<any> {
  const { check_run, repository, organization } = payload;

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const { name: jobName, status, started_at, completed_at } = check_run;

  if (status !== CheckRunStatus.Completed) {
    return;
  }

  const startedAt = new Date(started_at);
  const completedAt = new Date(completed_at);

  const lengthOfJob = completedAt.getTime() - startedAt.getTime();

  const jobInfo = {
    jobName,
    started_at,
    completed_at,
    lengthOfJob,
  };

  const jobRef = admin
    .firestore()
    .collection(`check_runs`)
    .doc(`${organizationName}-${repositoryName}`)
    .collection(jobName);

  try {
    await jobRef.add(jobInfo);
  } catch (e) {
    console.error(e);
  }
}
