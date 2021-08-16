import { expect } from 'chai';
import { after } from 'mocha';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { mockWebhookPayload } from './mockHttpFunction';

const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
});

if (admin.apps.length === 0) {
  admin.initializeApp();
}

describe('Pull Request tests', () => {
  after(() => {
    test.cleanup();
  });

  it('Tests an opened Pull Request', async () => {
    const data = require('../../src/webhook/pull-request/mocks/opened.json');

    try {
      await mockWebhookPayload('pull_request', data);
    } catch (e) {
      functions.logger.error('ERROR:', e);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const synchronizedPR = require('../../src/webhook/pull-request/mocks/synchronize.json');

    try {
      await mockWebhookPayload('pull_request', openedPR);
      await mockWebhookPayload('pull_request', synchronizedPR);
    } catch (e) {
      functions.logger.error('ERROR:', e);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const closedPR = require('../../src/webhook/pull-request/mocks/closed-not-merged.json');

    try {
      await mockWebhookPayload('pull_request', openedPR);
      await mockWebhookPayload('pull_request', closedPR);
    } catch (e) {
      functions.logger.error('ERROR:', e);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const mergedPR = require('../../src/webhook/pull-request/mocks/closed-and-merged.json');

    try {
      await mockWebhookPayload('pull_request', openedPR);
      await mockWebhookPayload('pull_request', mergedPR);
    } catch (e) {
      functions.logger.error('ERROR:', e);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const draftPR = require('../../src/webhook/pull-request/mocks/converted-to-draft.json');

    try {
      await mockWebhookPayload('pull_request', openedPR);
      await mockWebhookPayload('pull_request', draftPR);
    } catch (e) {
      functions.logger.error('ERROR:', e);
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

  it('Tests a pull request that gets converted to draft', async () => {
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const draftPR = require('../../src/webhook/pull-request/mocks/converted-to-draft.json');
    const readyPR = require('../../src/webhook/pull-request/mocks/ready-for-review.json');

    try {
      await mockWebhookPayload('pull_request', openedPR);
      await mockWebhookPayload('pull_request', draftPR);
      await mockWebhookPayload('pull_request', readyPR);
    } catch (e) {
      functions.logger.error('ERROR:', e);
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

// describe('Check Suite tests', () => {});
