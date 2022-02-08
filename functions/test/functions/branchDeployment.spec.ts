import { expect } from 'chai';
import { before } from 'mocha';
// https://github.com/axios/axios#note-commonjs-usage
const axios = require('axios').default;
import * as qs from 'qs';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

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

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';

let testEnv: RulesTestEnvironment;

before(async () => {
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

after(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();
});

describe('DCHBX deployment payload', () => {
  beforeEach(async () => {
    await testEnv.clearFirestore();
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

    await testEnv.withSecurityRulesDisabled(async context => {
      const envRef = doc(
        context.firestore(),
        `orgs/maine/environments/hotfix-2`,
      );
      const envSnap = await getDoc(envRef);
      expect(envSnap.data()).to.include({
        enrollBranch: 'feature-fix',
      });
    });

    await testEnv.withSecurityRulesDisabled(async context => {
      const serviceRef = doc(
        context.firestore(),
        'orgs/maine/environments/hotfix-2/services/enroll',
      );
      const serviceSnap = await getDoc(serviceRef);
      expect(serviceSnap.data()?.latestDeployment).to.include({
        status: 'started',
        branch: 'feature-fix',
        user_name: 'kvootla',
        commit_sha: 'abc1234',
      });
    });
  }).timeout(5000);
});
