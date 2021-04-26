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

describe('Webhook tests', () => {
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
      merged: false,
    });
  }).timeout(5000);
});
