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

  const workflowDocumentName = `${repositoryName}-${workflow_id}`;

  // Save workflow meta information if none exists
  const workflowDocumentReference = admin
    .firestore()
    .collection('workflows')
    .doc(workflowDocumentName);

  const workflowDocumentSnap = await workflowDocumentReference.get();

  if (!workflowDocumentSnap.exists) {
    await workflowDocumentReference.set({
      name,
    });
  }

  // Save workflow run to collection
  const workflowCollectionReference = admin
    .firestore()
    .collection('workflows')
    .doc(workflowDocumentName)
    .collection('runs');

  const runtime =
    new Date(updated_at).getTime() - new Date(run_started_at).getTime();

  // Using this as a Firestore Document ID and needs to be a string

  const workflowRunDocument: FSWorkflowRun = {
    runId: `${id}`,
    workflowId: `${workflow_id}`,
    htmlUrl: html_url,
    runStartedAt: run_started_at,
    updatedAt: updated_at,
    runtime,
    repositoryName,
    workflowName: name,
  };

  // Save the workflow run as a new document
  await workflowCollectionReference.doc(`${id}`).set(workflowRunDocument);
};
