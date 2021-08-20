import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as firebase from '@firebase/rules-unit-testing';

import { mockWebhookPayload } from '../mockHttpFunction';
import { mockCreatePayload } from '../../../src/webhook/create';
import { mockDeletePayload } from '../../../src/webhook/delete';
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

describe('Create tests', () => {
  afterEach(async () => {
    // test.cleanup();
    await firebase.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    });
  });

  it('tests branch deletion', async () => {
    try {
      await mockWebhookPayload('create', mockCreatePayload);
      await mockWebhookPayload('delete', mockDeletePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { ref: branchName } = mockDeletePayload;

    const createSnapshot = await getBranchRef(
      mockDeletePayload,
      branchName,
    ).get();

    expect(createSnapshot.exists).to.be.false;
  });
});
