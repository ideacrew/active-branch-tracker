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

describe('Data refresh payload v1', () => {
  after(() => {
    test.cleanup();
  });

  it('tests a started data refresh', async () => {
    const data = qs.stringify({
      payload:
        '{"status": "started", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "maine" }',
    });

    const config = axiosConfig('dataRefresh', data);

    try {
      // Make the http request
      await axios(config);
    } catch (e) {
      console.error('=====================================');
      console.error('ERROR:', e);
    }

    const serviceSnap = await admin
      .firestore()
      .collection('orgs')
      .doc('maine')
      .collection('environments')
      .doc('hotfix-2')
      .collection('services')
      .doc('enroll')
      .get();

    expect(serviceSnap.data()?.data).to.include({
      status: 'started',
      user_name: 'kvootla',
    });
  }).timeout(5000);

  it('tests a completed data refresh', async () => {
    const data = qs.stringify({
      payload:
        '{"status": "completed", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "maine" }',
    });

    const config = axiosConfig('dataRefresh', data);

    try {
      // Make the http request
      await axios(config);
    } catch (e) {
      console.error('=====================================');
      console.error('ERROR:', e);
    }

    const serviceSnap = await admin
      .firestore()
      .collection('orgs')
      .doc('maine')
      .collection('environments')
      .doc('hotfix-2')
      .collection('services')
      .doc('enroll')
      .get();

    expect(serviceSnap.data()?.data).to.include({
      status: 'completed',
      user_name: 'kvootla',
    });
  }).timeout(5000);
});
