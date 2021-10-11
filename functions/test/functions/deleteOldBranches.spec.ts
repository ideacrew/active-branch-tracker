import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as firebase from '@firebase/rules-unit-testing';
// https://github.com/axios/axios#note-commonjs-usage
import axios, { AxiosRequestConfig } from 'axios';
import * as faker from 'faker';

import { BranchInfo } from '../../src/models/branchInfo';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';

const admin = firebase.initializeAdminApp({
  projectId,
});

const axiosConfig: AxiosRequestConfig = {
  method: 'post',
  url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/deleteOldBranchDocuments`,
};

describe('Delete old branches', () => {
  afterEach(async () => {
    await firebase.clearFirestoreData({
      projectId,
    });
  });

  const today = new Date();
  const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
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
        timestamp: faker.date.between(ninetyDaysAgo, today).getTime(),
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
      await admin
        .firestore()
        .collection('branches')
        .doc(faker.random.alpha({ count: 10 }))
        .set(branch);
    });

    let responsePayload;
    try {
      responsePayload = await axios(axiosConfig);
    } catch (e) {
      console.error('ERROR:', e);
    }
    const branchesCollection = admin.firestore().collection('branches');
    const snapshot = await branchesCollection.get();

    expect(snapshot.size).to.equal(7);

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload?.data).to.equal('5 branches successfully deleted');
  }).timeout(5000);

  it('tests deleting old branches when there are no old branches', async () => {
    // const today = new Date();
    // const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    [...fakeCurrentBranches, ...fakeDefaultBranches].forEach(branch => {
      admin
        .firestore()
        .collection('branches')
        .doc(faker.random.alpha({ count: 10 }))
        .set(branch);
    });

    let responsePayload;
    try {
      // Make the http request
      responsePayload = await axios(axiosConfig);
    } catch (e) {
      console.error('ERROR:', e);
    }
    const branchesRef = admin.firestore().collection('branches');
    const snapshot = await branchesRef.get();

    expect(snapshot.size).to.equal(7);

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload?.data).to.equal('No branches to delete');
  }).timeout(5000);

  it.skip('tests deleting a LOT old branches', async () => {
    const today = new Date();
    const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    const moreFakeBranches: Partial<BranchInfo>[] = Array.from(
      { length: 101 },
      () => {
        return {
          defaultBranch: false,
          timestamp: faker.date.between('Jan 1, 2020', ninetyDaysAgo).getTime(),
        };
      },
    );

    [...moreFakeBranches, ...fakeDefaultBranches].forEach(branch => {
      admin
        .firestore()
        .collection('branches')
        .doc(faker.random.alpha({ count: 10 }))
        .set(branch);
    });

    let responsePayload;
    try {
      // Make the http request
      responsePayload = await axios(axiosConfig);
    } catch (e) {
      console.error('ERROR:', e);
    }
    const branchesRef = admin.firestore().collection('branches');
    const snapshot = await branchesRef.get();

    expect(snapshot.size).to.equal(3);

    // Wait for the promise to be resolved and then check the sent text
    expect(responsePayload?.data).to.equal('100 branches successfully deleted');
  }).timeout(10000);
});
