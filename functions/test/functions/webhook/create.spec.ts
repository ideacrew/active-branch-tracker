import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as firebase from '@firebase/rules-unit-testing';

import { mockWebhookPayload } from '../mockHttpFunction';
import { mockCreatePayload } from '../../../src/webhook/create';
import { createSafeBranchName } from '../../../src/safeBranchName';
import { WebhookPayload } from '../../../src/webhook/interfaces';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';

const admin = firebase.initializeAdminApp({
  projectId,
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

describe('Create tests', () => {
  afterEach(async () => {
    // test.cleanup();
    await firebase.clearFirestoreData({
      projectId,
    });
  });

  it('tests a new branch creation', async () => {
    try {
      await mockWebhookPayload('create', mockCreatePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { ref: branchName } = mockCreatePayload;

    const createSnapshot = await getBranchRef(
      mockCreatePayload,
      branchName,
    ).get();

    expect(createSnapshot.data()).to.include({
      checkSuiteRuns: 0,
      checkSuiteFailures: 0,
      checkSuiteStatus: 'neutral',
      tracked: false,
      // cannot test created at because it is always "now"
    });
  });
});
