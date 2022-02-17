import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
// https://github.com/axios/axios#note-commonjs-usage
const axios = require('axios').default;
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { DataRefreshPayload } from '../../../src/data-refresh';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';
let testEnv: RulesTestEnvironment;

export const axiosConfig = (route: string, data: unknown) => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/api/${route}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
};

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');

  testEnv = await initializeTestEnvironment({
    firestore: {
      port: 8080,
      host: 'localhost',
    },
    projectId,
  });
});

afterAll(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();
});

describe('Data refresh payload', () => {
   it('tests a started data refresh', async () => {
    const data: DataRefreshPayload = {
      status: 'started',
      env: 'hotfix-2',
      app: 'enroll',
      user_name: 'kvootla',
      org: 'maine',
    };

    const config = axiosConfig('data-refresh', data);

    try {
      // Make the http request
      await axios(config);
    } catch (e) {
      console.error('=====================================');
      console.error('ERROR:', e);
    }

    await testEnv.withSecurityRulesDisabled(async context => {
      const serviceRef = doc(
        context.firestore(),
        'orgs/maine/environments/hotfix-2/services/enroll',
      );

      const serviceSnap = await getDoc(serviceRef);

      expect(serviceSnap.data()?.data).toMatchObject({
        status: 'started',
        user_name: 'kvootla',
      });
    });
  });

  it('tests a completed data refresh', async () => {
    const data: DataRefreshPayload = {
      status: 'completed',
      env: 'hotfix-2',
      app: 'enroll',
      user_name: 'kvootla',
      org: 'maine',
    };

    const config = axiosConfig('data-refresh', data);

    try {
      // Make the http request
      await axios(config);
    } catch (e) {
      console.error('=====================================');
      console.error('ERROR:', e);
    }

    await testEnv.withSecurityRulesDisabled(async context => {
      const serviceRef = doc(
        context.firestore(),
        'orgs/maine/environments/hotfix-2/services/enroll',
      );

      const serviceSnap = await getDoc(serviceRef);

      expect(serviceSnap.data()?.data).toMatchObject({
        status: 'completed',
        user_name: 'kvootla',
      });
    });
  });
});
