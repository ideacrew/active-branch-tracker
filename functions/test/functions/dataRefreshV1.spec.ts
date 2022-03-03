// https://github.com/axios/axios#note-commonjs-usage
import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

const axiosConfig = (
  functionName: string,
  data: unknown,
): AxiosRequestConfig => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/${functionName}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };
};

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';
let testEnv: RulesTestEnvironment;

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

describe('Data refresh payload v1', () => {
  it('tests a started data refresh', async () => {
    const data = stringify({
      payload:
        '{"status": "started", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "another-fake-org" }',
    });

    const config = axiosConfig('dataRefresh', data);

    await axios(config);

    await testEnv.withSecurityRulesDisabled(async context => {
      const serviceReference = doc(
        context.firestore(),
        'orgs/another-fake-org/environments/hotfix-2/services/enroll',
      );

      const serviceSnapshot = await getDoc(serviceReference);

      const serviceDocument = serviceSnapshot.data();

      expect(serviceSnapshot.data()?.data).toMatchObject({
        status: 'started',
        user_name: 'kvootla',
      });
    });
  });

  it('tests a completed data refresh', async () => {
    const data = stringify({
      payload:
        '{"status": "completed", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "third-fake-org" }',
    });

    const config = axiosConfig('dataRefresh', data);

    await axios(config);

    await testEnv.withSecurityRulesDisabled(async context => {
      const serviceRef = doc(
        context.firestore(),
        'orgs/third-fake-org/environments/hotfix-2/services/enroll',
      );

      const serviceSnap = await getDoc(serviceRef);

      expect(serviceSnap.data()?.data).toMatchObject({
        status: 'completed',
        user_name: 'kvootla',
      });
    });
  });
});
