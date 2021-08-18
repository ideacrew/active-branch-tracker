import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as firebase from '@firebase/rules-unit-testing';

import { mockWebhookPayload } from '../mockHttpFunction';
import {
  mockFailurePayload,
  mockSuccessPayload,
} from '../../../src/webhook/check-suite';
import { createSafeBranchName } from '../../../src/safeBranchName';
import { WebhookPayload } from '../../../src/webhook/interfaces';

const admin = firebase.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
});

const getBranchRef = (
  payload: WebhookPayload,
  branchName: string,
): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> => {
  const { repository, organization } = payload;
  const { login: organizationName } = organization;
  const { name: repositoryName } = repository;
  const safeBranchName = createSafeBranchName(branchName);

  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  return branchRef;
};

describe('Check Suite tests', () => {
  afterEach(async () => {
    // test.cleanup();
    await firebase.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    });
  });

  it('tests a first-time successful check suite result', async () => {
    try {
      await mockWebhookPayload('check_suite', mockSuccessPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { head_branch: branchName } = mockSuccessPayload.check_suite;

    const checkSuiteSnapshot = await getBranchRef(
      mockSuccessPayload,
      branchName,
    ).get();

    expect(checkSuiteSnapshot.data()).to.include({
      checkSuiteRuns: 1,
      checkSuiteFailures: 0,
    });
  });

  it('tests a first-time failed check suite result', async () => {
    try {
      await mockWebhookPayload('check_suite', mockFailurePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { head_branch: branchName } = mockFailurePayload.check_suite;

    const checkSuiteSnapshot = await getBranchRef(
      mockFailurePayload,
      branchName,
    ).get();

    expect(checkSuiteSnapshot.data()).to.include({
      checkSuiteRuns: 1,
      checkSuiteFailures: 1,
    });
  });

  // This test is designed using two payloads with the same branch, repo, org
  // The first payload is a successful check suite result with an older completion time
  // The second payload is a failed check suite result with a newer completion time, but an earlier creation time
  it('tests a failed test with an older timestamp than a newer successful run', async () => {
    try {
      await mockWebhookPayload('check_suite', mockSuccessPayload);
      await mockWebhookPayload('check_suite', mockFailurePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { head_branch: branchName } = mockFailurePayload.check_suite;

    const checkSuiteSnapshot = await getBranchRef(
      mockFailurePayload,
      branchName,
    ).get();

    expect(checkSuiteSnapshot.data()).to.include({
      checkSuiteStatus: 'failure',
      checkSuiteRuns: 2,
      checkSuiteFailures: 1,
    });
  }).timeout(5000);
});
