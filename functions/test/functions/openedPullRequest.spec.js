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
    const data = require('../../src/webhook/pull-request/mocks/pullRequest.opened.json');

    const config = axiosConfig('pull_request', data);

    try {
      await axios(config);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const prSnapshot = await admin
      .firestore()
      .collection('pullRequests')
      .doc('ideacrew-active-branch-tracker-test-pr-12')
      .get();

    expect(prSnapshot.data()).to.deep.eq({
      additions: 3,
      branchName: 'test-pr',
      changedFiles: 1,
      commits: 1,
      createdAt: {
        _nanoseconds: 0,
        _seconds: 1617809215,
      },
      deletions: 0,
      number: 12,
      organizationName: 'ideacrew',
      repositoryName: 'active-branch-tracker',
      targetBranchName: 'trunk',
      updatedAt: {
        _nanoseconds: 0,
        _seconds: 1617809215,
      },
      userName: 'markgoho',
    });
  }).timeout(5000);
});
