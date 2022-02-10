import { expect } from 'chai';
import { before, after } from 'mocha';

import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
// https://github.com/axios/axios#note-commonjs-usage
const axios = require('axios').default;
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { ServiceDeploymentPayload } from '../../../src/api/models';

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

describe('Service deployment payload', () => {
  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it('tests a new deployment', async () => {
    const data: ServiceDeploymentPayload = {
      image: 'public.ecr.aws/ideacrew/enroll:trunk-48132c8',
      status: 'completed',
      env: 'hotfix-2',
      user_name: 'kvootla',
      org: 'maine',
    };

    const config = axiosConfig('service-deployment', data);

    try {
      // Make the http request
      await axios(config);
    } catch (e) {
      console.error('=====================================');
      console.error('ERROR:', e);
    }

    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();
      const envRef = doc(db, `orgs/maine/environments/${data.env}`);
      const envSnap = await getDoc(envRef);

      expect(envSnap.data()).to.include({
        enrollBranch: 'trunk',
      });

      const serviceRef = doc(
        db,
        `orgs/maine/environments/${data.env}/services/enroll`,
      );
      const serviceSnapshot = await getDoc(serviceRef);

      const serviceDocument = serviceSnapshot.data();

      expect(serviceDocument.latestDeployment).to.include({
        status: data.status,
        branch: 'trunk',
        user_name: data.user_name,
        commit_sha: '48132c8',
      });
    });
  }).timeout(5000);
});
