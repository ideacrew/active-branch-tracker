import { expect } from 'chai';
import { after } from 'mocha';
// https://github.com/axios/axios#note-commonjs-usage
const axios = require('axios').default;
import * as admin from 'firebase-admin';
import * as qs from 'qs';

const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
});

test.mockConfig({ slack: { token: 1234 } });

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const axiosConfig = (functionName: string, data: unknown) => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/${functionName}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
};

describe('Service deployment payload', () => {
  after(() => {
    test.cleanup();
  });

  it('tests a new deployment', async () => {
    const data = {
      status: 'completed',
      branch: 'trunk',
      env: 'hotfix-2',
      app: 'enroll',
      user_name: 'kvootla',
      org: 'maine',
      repo: 'enroll',
      commit_sha: '48132c8',
    };

    const config = axiosConfig('serviceDeployment', data);

    try {
      // Make the http request
      await axios(config);
    } catch (e) {
      console.error('=====================================');
      console.error('ERROR:', e);
    }

    const envSnap = await admin
      .firestore()
      .collection('orgs')
      .doc('maine')
      .collection('environments')
      .doc(data.env)
      .get();

    const serviceSnap = await admin
      .firestore()
      .collection('orgs')
      .doc('maine')
      .collection('environments')
      .doc(data.env)
      .collection('services')
      .doc('enroll')
      .get();

    expect(envSnap.data()).to.include({
      enrollBranch: data.branch,
    });

    expect(serviceSnap.data()?.latestDeployment).to.include({
      status: data.status,
      branch: data.branch,
      user_name: data.user_name,
      commit_sha: '48132c8',
    });
  }).timeout(5000);
});
