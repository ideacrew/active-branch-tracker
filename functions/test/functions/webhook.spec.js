const { expect } = require('chai');
const axios = require('axios');
const admin = require('firebase-admin');
const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
});

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const axiosConfig = (eventType, data) => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/webhook`,
    headers: {
      'Content-Type': 'application/json',
      'X-Github-Event': eventType,
    },
    data,
  };
};

describe('Pull Request tests', () => {
  after(() => {
    console.log('Cleaning up');
    test.cleanup();
  });

  it('Tests an opened Pull Request', async () => {
    const data = require('../../src/webhook/pull-request/mocks/opened.json');

    const config = axiosConfig('pull_request', data);

    try {
      await axios(config);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const synchronizedPR = require('../../src/webhook/pull-request/mocks/synchronize.json');

    const openedPRConfig = axiosConfig('pull_request', openedPR);
    const synchronizedPRConfig = axiosConfig('pull_request', synchronizedPR);

    try {
      await axios(openedPRConfig);
      await axios(synchronizedPRConfig);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const closedPR = require('../../src/webhook/pull-request/mocks/closed-not-merged.json');

    const openedPRConfig = axiosConfig('pull_request', openedPR);
    const closedPRConfig = axiosConfig('pull_request', closedPR);

    try {
      await axios(openedPRConfig);
      await axios(closedPRConfig);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const mergedPR = require('../../src/webhook/pull-request/mocks/closed-and-merged.json');

    const openedPRConfig = axiosConfig('pull_request', openedPR);
    const mergedPRConfig = axiosConfig('pull_request', mergedPR);

    try {
      await axios(openedPRConfig);
      await axios(mergedPRConfig);
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
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const draftPR = require('../../src/webhook/pull-request/mocks/converted-to-draft.json');

    const openedPRConfig = axiosConfig('pull_request', openedPR);
    const draftPRConfig = axiosConfig('pull_request', draftPR);

    try {
      await axios(openedPRConfig);
      await axios(draftPRConfig);
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

  it('Tests a pull request that gets converted to draft', async () => {
    const openedPR = require('../../src/webhook/pull-request/mocks/opened.json');
    const draftPR = require('../../src/webhook/pull-request/mocks/converted-to-draft.json');
    const readyPR = require('../../src/webhook/pull-request/mocks/ready-for-review.json');

    const openedPRConfig = axiosConfig('pull_request', openedPR);
    const draftPRConfig = axiosConfig('pull_request', draftPR);
    const readyPRConfig = axiosConfig('pull_request', readyPR);

    try {
      await axios(openedPRConfig);
      await axios(draftPRConfig);
      await axios(readyPRConfig);
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
