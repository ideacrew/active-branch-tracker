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
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };
};

describe('DCHBX deployment payload', () => {
  after(() => {
    test.cleanup();
  });

  it('tests a new deployment', async () => {
    const data = qs.stringify({
      payload:
        '{"status": "started", "branch": "feature-fix", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "maine", "repo": "enroll", "commit_sha": "abc1234" }',
    });

    const config = axiosConfig('branchDeployment', data);

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
      .doc('hotfix-2')
      .get();

    const serviceSnap = await admin
      .firestore()
      .collection('orgs')
      .doc('maine')
      .collection('environments')
      .doc('hotfix-2')
      .collection('services')
      .doc('enroll')
      .get();

    expect(envSnap.data()).to.include({
      enrollBranch: 'feature-fix',
    });

    expect(serviceSnap.data()?.latestDeployment).to.include({
      status: 'started',
      branch: 'feature-fix',
      user_name: 'kvootla',
      commit_sha: 'abc1234',
    });
  }).timeout(5000);
});
