/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as admin from 'firebase-admin';

import { BranchInfo } from '../models/branchInfo';
import { createSafeBranchName } from '../safeBranchName';
import { getBranchRef } from '../util/branchRef';
import { CheckSuitePayload } from './interfaces';

/**
 * Handles a check suite event from GitHub Actions
 * @param {CheckSuitePayload} payload
 */
export async function handleCheckSuiteEvent(
  payload: CheckSuitePayload,
): Promise<void> {
  const { check_suite, repository, organization } = payload;

  const { name: repositoryName, default_branch } = repository;
  const { login: organizationName } = organization;

  const {
    head_branch: branchName,
    head_commit,
    head_sha,
    updated_at,
    conclusion: checkSuiteStatus,
  } = check_suite;

  const safeBranchName = createSafeBranchName(branchName);

  const checkSuitePayloadRef = admin
    .firestore()
    .collection('payloads')
    .doc(`check_suite-${organizationName}-${repositoryName}-${safeBranchName}`);

  try {
    await checkSuitePayloadRef.set(payload);
  } catch (e) {
    console.error('Could not set payload to ref', payload);
  }

  const branchRef = getBranchRef({
    organizationName,
    repositoryName,
    branchName,
  });

  const existingStatus = await branchRef.get();

  let checkSuiteRuns = 0;
  let checkSuiteFailures = 0;
  let tracked = false;

  if (existingStatus.exists) {
    const existingStatusDoc = existingStatus.data() as BranchInfo;
    checkSuiteRuns = existingStatusDoc.checkSuiteRuns;
    checkSuiteFailures = existingStatusDoc.checkSuiteFailures;
    tracked = existingStatusDoc.tracked ?? false;
  }

  const timestamp = new Date(updated_at).getTime();

  const failure = checkSuiteStatus === 'failure' ? 1 : 0;

  const currentStatus: Partial<BranchInfo> = {
    repositoryName,
    organizationName,
    branchName,
    head_commit,
    head_sha,
    updated_at,
    timestamp,
    tracked,
    checkSuiteRuns: checkSuiteRuns + 1,
    checkSuiteFailures: checkSuiteFailures + failure,
    checkSuiteStatus,
    defaultBranch: default_branch === branchName,
  };

  try {
    await admin
      .firestore()
      .collection(`branches`)
      .doc(`${organizationName}-${repositoryName}-${safeBranchName}`)
      .set(currentStatus, { merge: true });
  } catch (e) {
    console.error(e);
  }
}
