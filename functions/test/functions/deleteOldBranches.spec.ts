import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import axios, { AxiosRequestConfig } from 'axios';
import { faker } from '@faker-js/faker';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  setLogLevel,
} from 'firebase/firestore';

import { BranchInfo } from '../../src/models/branch-info';

const axiosConfig: AxiosRequestConfig = {
  method: 'post',
  url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/deleteOldBranchDocuments`,
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

afterAll(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();
});

describe.skip('Delete old branches', () => {
  const today = new Date();
  const ninetyDaysAgo = new Date(
    today.getTime() - 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const fakeOldBranches: Partial<BranchInfo>[] = Array.from(
    { length: 5 },
    () => {
      return {
        defaultBranch: false,
        timestamp: faker.date.between('Jan 1, 2020', ninetyDaysAgo).getTime(),
      };
    },
  );
  const fakeCurrentBranches: Partial<BranchInfo>[] = Array.from(
    { length: 5 },
    () => {
      return {
        defaultBranch: false,
        timestamp: faker.date
          .between(ninetyDaysAgo, today.toISOString())
          .getTime(),
      };
    },
  );
  const fakeDefaultBranches: Partial<BranchInfo>[] = Array.from(
    { length: 2 },
    () => {
      return {
        defaultBranch: true,
        timestamp: faker.date.between('Jan 1, 2020', ninetyDaysAgo).getTime(),
      };
    },
  );

  it('tests deleting old branches that are not default branches', async () => {
    [
      ...fakeOldBranches,
      ...fakeCurrentBranches,
      ...fakeDefaultBranches,
    ].forEach(async branch => {
      const docId = faker.random.alpha({ count: 10 });

      await testEnv.withSecurityRulesDisabled(async context => {
        const docRef = doc(context.firestore(), `branches/${docId}`);

        await setDoc(docRef, branch);
      });
    });

    const responsePayload = await axios(axiosConfig);

    await testEnv.withSecurityRulesDisabled(async context => {
      const collectionRef = collection(context.firestore(), `branches`);

      const branchesSnapshot = await getDocs(collectionRef);

      expect(branchesSnapshot.size).toEqual(7);
    });

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload?.data).toEqual('5 branches successfully deleted');
  });

  it('tests deleting old branches when there are no old branches', async () => {
    [...fakeCurrentBranches, ...fakeDefaultBranches].forEach(async branch => {
      const docId = faker.random.alpha({ count: 10 });

      await testEnv.withSecurityRulesDisabled(async context => {
        const docRef = doc(context.firestore(), `branches/${docId}`);

        await setDoc(docRef, branch);
      });
    });

    const responsePayload = await axios(axiosConfig);

    await testEnv.withSecurityRulesDisabled(async context => {
      const collectionRef = collection(context.firestore(), `branches`);

      const branchesSnapshot = await getDocs(collectionRef);

      expect(branchesSnapshot.size).toEqual(7);
    });

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload?.data).toEqual('No branches to delete');
  });

  it.skip('tests deleting a LOT old branches', async () => {
    const today = new Date();
    const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    const moreFakeBranches: Partial<BranchInfo>[] = Array.from(
      { length: 101 },
      () => {
        return {
          defaultBranch: false,
          timestamp: faker.date
            .between('Jan 1, 2020', ninetyDaysAgo.toISOString())
            .getTime(),
        };
      },
    );

    [...moreFakeBranches, ...fakeDefaultBranches].forEach(async branch => {
      const docId = faker.random.alpha({ count: 10 });

      await testEnv.withSecurityRulesDisabled(async context => {
        const docRef = doc(context.firestore(), `branches/${docId}`);

        await setDoc(docRef, branch);
      });
    });

    let responsePayload;
    try {
      // Make the http request
      responsePayload = await axios(axiosConfig);
    } catch (e) {
      console.error('ERROR:', e);
    }

    await testEnv.withSecurityRulesDisabled(async context => {
      const collectionRef = collection(context.firestore(), `branches`);

      const branchesSnapshot = await getDocs(collectionRef);

      expect(branchesSnapshot.size).toEqual(3);
    });

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload?.data).toEqual('100 branches successfully deleted');
  });
});
