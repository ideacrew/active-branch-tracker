/* eslint-disable camelcase */
import * as admin from 'firebase-admin';

import { WorkflowRunPayload } from './models';
import { FSWorkflowRun } from '../../models';

export const recordWorkflowRun = async (
  payload: WorkflowRunPayload,
): Promise<void> => {
  const { workflow_run, repository } = payload;

  const { name: repositoryName } = repository;

  const { updated_at, workflow_id, id, html_url, run_started_at, name } =
    workflow_run;

  // Using this as a Firestore Document ID and needs to be a string
  const workflowRunId = id.toString();

  const workflowDocName = `${repositoryName}-${workflow_id}`;

  const workflowCollectionRef = admin
    .firestore()
    .collection('workflows')
    .doc(workflowDocName)
    .collection('runs');

  const runtime =
    new Date(updated_at).getTime() - new Date(run_started_at).getTime();

  const workflowRunDoc: FSWorkflowRun = {
    runId: workflowRunId,
    workflowId: workflow_id.toString(),
    htmlUrl: html_url,
    runStartedAt: run_started_at,
    updatedAt: updated_at,
    runtime,
    repositoryName,
    workflowName: name,
  };

  // Save the workflow run as a new document
  await workflowCollectionRef.doc(workflowRunId).set(workflowRunDoc);
};
