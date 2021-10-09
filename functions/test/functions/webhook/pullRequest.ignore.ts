import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as firebase from '@firebase/rules-unit-testing';

import { mockWebhookPayload } from '../mockHttpFunction';
import {
  mockClosedAndMergedPayload,
  mockClosedNotMergedPayload,
  mockDraftPayload,
  mockOpenedPayload,
  mockReadyForReviewPayload,
  mockSynchronizedPayload,
} from '../../../src/webhook/pull-request';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';

const admin = firebase.initializeAdminApp({
  projectId,
});

describe.skip('Pull Request tests', () => {
  afterEach(async () => {
    await firebase.clearFirestoreData({
      projectId,
    });
  });

  it('Tests an opened Pull Request', async () => {
    try {
      await mockWebhookPayload('pull_request', mockOpenedPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-sample-pull-request-13')
      .get();

    expect(prSnapshot.data()).to.deep.eq({
      additions: 506,
      branchName: 'sample-pull-request',
      changedFiles: 8,
      commits: 1,
      createdAt: {
        _nanoseconds: 0,
        _seconds: 1619030860,
      },
      closed: false,
      merged: false,
      draft: false,
      deletions: 7,
      number: 13,
      organizationName: 'ideacrew',
      repositoryName: 'active-branch-tracker',
      targetBranchName: 'trunk',
      updatedAt: {
        _nanoseconds: 0,
        _seconds: 1619030860,
      },
      userName: 'markgoho',
    });
  }).timeout(5000);

  it('Tests a synchronized pull request event', async () => {
    try {
      await mockWebhookPayload('pull_request', mockOpenedPayload);
      await mockWebhookPayload('pull_request', mockSynchronizedPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-sample-pull-request-13')
      .get();

    expect(prSnapshot.data()).to.deep.eq({
      additions: 2038,
      branchName: 'sample-pull-request',
      changedFiles: 13,
      commits: 2,
      createdAt: {
        _nanoseconds: 0,
        _seconds: 1619030860,
      },
      closed: false,
      merged: false,
      draft: false,
      deletions: 665,
      number: 13,
      organizationName: 'ideacrew',
      repositoryName: 'active-branch-tracker',
      targetBranchName: 'trunk',
      updatedAt: {
        _nanoseconds: 0,
        _seconds: 1619031586,
      },
      userName: 'markgoho',
    });
  }).timeout(5000);

  it('Tests a closed, but not merged pull request event', async () => {
    try {
      await mockWebhookPayload('pull_request', mockOpenedPayload);
      await mockWebhookPayload('pull_request', mockClosedNotMergedPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-sample-pull-request-13')
      .get();

    expect(prSnapshot.data()).to.include({
      closed: true,
      merged: false,
    });
  }).timeout(5000);

  it('Tests a closed and merged pull request event', async () => {
    try {
      await mockWebhookPayload('pull_request', mockOpenedPayload);
      await mockWebhookPayload('pull_request', mockClosedAndMergedPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-sample-pull-request-13')
      .get();

    expect(prSnapshot.data()).to.include({
      closed: true,
      merged: true,
    });
  }).timeout(5000);

  it('Tests a pull request that gets converted to draft', async () => {
    try {
      await mockWebhookPayload('pull_request', mockOpenedPayload);
      await mockWebhookPayload('pull_request', mockDraftPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-sample-pull-request-13')
      .get();

    expect(prSnapshot.data()).to.include({
      draft: true,
    });
  }).timeout(5000);

  it('Tests a pull request that gets converted to draft and then is marked ready for review', async () => {
    try {
      await mockWebhookPayload('pull_request', mockOpenedPayload);
      await mockWebhookPayload('pull_request', mockDraftPayload);
      await mockWebhookPayload('pull_request', mockReadyForReviewPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-sample-pull-request-13')
      .get();

    expect(prSnapshot.data()).to.include({
      draft: false,
    });
  }).timeout(5000);
});
