import { expect } from 'chai';
import { after } from 'mocha';

import * as functions from 'firebase-functions';
import * as firebase from '@firebase/rules-unit-testing';
const admin = firebase.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
});

import { mockWebhookPayload } from '../mockHttpFunction';
import { mockPayload } from '../../../src/webhook/check-suite/mocks';
import { createSafeBranchName } from '../../../src/safeBranchName';

// const test = require('firebase-functions-test')({
//   projectId: process.env.GCLOUD_PROJECT,
// });

// if (admin.apps.length === 0) {
//   admin.initializeApp();
// }

describe('Check Suite tests', () => {
  after(async () => {
    // test.cleanup();
    await firebase.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    });
  });

  it('tests a first-time successful check suite result', async () => {
    try {
      await mockWebhookPayload('check_suite', mockPayload);
    } catch (e) {
      functions.logger.error('ERROR:', e);
    }

    const { check_suite, repository, organization } = mockPayload;
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

    const checkSuiteSnapshot = await admin
      .firestore()
      .collection('branches')
      .doc(`${organizationName}-${repositoryName}-${safeBranchName}`)
      .get();

    expect(checkSuiteSnapshot.data()).to.include({
      repositoryName,
      organizationName,
      branchName,
      checkSuiteRuns: 1,
      checkSuiteFailures: 0,
      defaultBranch: false,
    });
  });
});
