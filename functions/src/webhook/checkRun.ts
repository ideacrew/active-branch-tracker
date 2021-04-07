/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import { CheckRunPayload } from './interfaces';

/**
 * Handles a check run event
 * @param { CheckRunPayload } payload
 * @return { Promise<void> } promise
 */
export async function handleCheckRunEvent(
  payload: CheckRunPayload,
): Promise<void> {
  const { check_run, repository, organization } = payload;

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const { name: jobName, status, started_at, completed_at } = check_run;

  if (status !== 'completed') {
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
