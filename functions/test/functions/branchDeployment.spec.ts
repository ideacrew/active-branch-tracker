// https://github.com/axios/axios#note-commonjs-usage
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
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

describe('DCHBX deployment payload', () => {
  it('tests a new deployment', async () => {
    const data = qs.stringify({
      payload: `{"status": "started", "branch": "feature-fix", "env": "hotfix-2", "app": "enroll", "user_name": "kvootla", "org": "fake-org", "repo": "enroll", "commit_sha": "abc1234" }`,
    });

    const config = axiosConfig('branchDeployment', data);

    await axios(config);

    await testEnv.withSecurityRulesDisabled(async context => {
      const envRef = doc(
        context.firestore(),
        `orgs/fake-org/environments/hotfix-2`,
      );
      const envSnap = await getDoc(envRef);

      // .toMatchObject()
      expect(envSnap.data()).toMatchObject({
        enrollBranch: 'feature-fix',
      });
    });

    await testEnv.withSecurityRulesDisabled(async context => {
      const serviceRef = doc(
        context.firestore(),
        'orgs/fake-org/environments/hotfix-2/services/enroll',
      );
      const serviceSnap = await getDoc(serviceRef);
      expect(serviceSnap.data()?.latestDeployment).toMatchObject({
        status: 'started',
        branch: 'feature-fix',
        user_name: 'kvootla',
        commit_sha: 'abc1234',
      });
    });
  });
});
