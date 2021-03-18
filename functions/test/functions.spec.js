const { expect } = require('chai');
const axios = require('axios');
const qs = require('qs');
const admin = require('firebase-admin');
const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
});

const axiosConfig = (functionName, data) => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/${functionName}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };
};

describe('Unit tests', () => {
  after(() => {
    test.cleanup();
  });

  it('tests a new deployment', async () => {
    const data = qs.stringify({
      payload:
        '{"status": "started", "branch": "feature-fix", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "maine", "repo": "enroll", "commit_sha": "abc1234" }',
    });

    const config = axiosConfig('branchDeployment', data);

    let responsePayload;
    try {
      // Make the http request
      responsePayload = await axios(config);
    } catch (e) {
      console.log('ERROR:', e);
    }

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload.data).to.deep.eq({
      status: 'started',
      branch: 'feature-fix',
      env: 'hotfix-2',
      app: 'enroll',
      user_name: 'kvootla',
      org: 'maine',
      repo: 'enroll',
      commit_sha: 'abc1234',
    });

    // const envSnap = await admin
    //   .firestore()
    //   .collection('orgs')
    //   .doc('maine')
    //   .collection('environments')
    //   .doc('hotfix-2')
    //   .get();

    // expect(envSnap.data()).to.eql({
    //   status: 'started',
    //   branch: 'feature-fix',
    //   env: 'hotfix-2',
    //   app: 'enroll',
    //   user_name: 'kvootla',
    //   org: 'maine',
    //   repo: 'enroll',
    //   commit_sha: 'abc1234',
    // });
  }).timeout(5000);
});
