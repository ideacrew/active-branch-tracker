import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
// https://github.com/axios/axios#note-commonjs-usage
const axios = require('axios').default;
import {
  collection,
  doc,
  getDoc,
  setLogLevel,
  query,
  limit,
  getDocs,
} from 'firebase/firestore';
import { faker } from '@faker-js/faker';

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

describe('Service deployment payload', () => {
  const branchName = faker.git.branch();

  it('tests a new deployment', async () => {
    const data: ServiceDeploymentPayload = {
      image: `public.ecr.aws/ideacrew/enroll:${branchName}-48132c8`,
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

      expect(envSnap.data()).toMatchObject({
        enrollBranch: branchName,
      });

      const serviceRef = doc(
        db,
        `orgs/maine/environments/${data.env}/services/enroll`,
      );
      const serviceSnapshot = await getDoc(serviceRef);

      const serviceDocument = serviceSnapshot.data();

      expect(serviceDocument.latestDeployment).toMatchObject({
        status: data.status,
        branch: branchName,
        user_name: data.user_name,
        commit_sha: '48132c8',
      });

      // The document id isn't known, so a query is necessary here
      const deploymentHistoryReference = collection(
        db,
        `orgs/maine/environments/${data.env}/services/enroll/deployments`,
      );

      // Limit to the first (and only) document in the collection
      const q = query(deploymentHistoryReference, limit(1));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        const serviceDeployment = doc.data();

        expect(serviceDeployment).toMatchObject({
          app: 'enroll',
          branch: branchName,
          commit_sha: '48132c8',
          image: `public.ecr.aws/ideacrew/enroll:${branchName}-48132c8`,
          status: 'completed',
          env: 'hotfix-2',
          user_name: 'kvootla',
          org: 'maine',
        });

        // Timestamp of completion, check for existence
        expect(serviceDeployment).toHaveProperty('completed');
      });
    });
  });
});
