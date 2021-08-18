import { expect } from 'chai';
import { after } from 'mocha';
// https://github.com/axios/axios#note-commonjs-usage
const axios = require('axios').default;
import * as admin from 'firebase-admin';
import * as qs from 'qs';
const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
});

if (admin.apps.length === 0) {
  admin.initializeApp();
}

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

describe('Branch deployment payload', () => {
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
      console.error('ERROR:', e);
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

    const envSnap = await admin
      .firestore()
      .collection('orgs')
      .doc('maine')
      .collection('environments')
      .doc('hotfix-2')
      .get();

    expect(envSnap.data().latestDeployment).to.include({
      status: 'started',
      branch: 'feature-fix',
      env: 'hotfix-2',
      app: 'enroll',
      // user_name: 'kvootla',
      org: 'maine',
      repo: 'enroll',
      commit_sha: 'abc1234',
    });
  }).timeout(5000);

  it('tests a new deployment to an environment without an owner', async () => {
    const org = 'maine';
    const env = 'qa';

    const envRef = admin.firestore().doc(`orgs/${org}/environments/${env}`);
    // Set environment metadata first
    try {
      await envRef.set({
        architecture: 'e2e',
        name: 'QA',
        owner: 'Open',
        prodlike: true,
      });
    } catch (e) {
      console.error('ERROR:', e);
    }

    const snap = await envRef.get();
    expect(snap.data()).to.deep.eq({
      architecture: 'e2e',
      name: 'QA',
      owner: 'Open',
      prodlike: true,
    });

    const data = qs.stringify({
      payload: `{"status": "started", "branch": "feature-fix", "env": "${env}", "app": "enroll", "user_name": "kvootla", "org": "${org}", "repo": "enroll", "commit_sha": "abc1234" }`,
    });

    const config = axiosConfig('branchDeployment', data);

    try {
      await axios(config);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const postDeploymentRef = admin
      .firestore()
      .doc(`orgs/${org}/environments/${env}`);

    const postDeploymentSnapshot = await postDeploymentRef.get();

    const postDeploymentData = postDeploymentSnapshot.data();

    expect(postDeploymentData).to.include({
      architecture: 'e2e',
      name: 'QA',
      owner: 'Open',
      prodlike: true,
    });

    expect(postDeploymentData.latestDeployment).to.include({
      status: 'started',
      branch: 'feature-fix',
      env,
      app: 'enroll',
      // user_name: 'kvootla',
      org,
      repo: 'enroll',
      commit_sha: 'abc1234',
    });
  }).timeout(5000);
});
