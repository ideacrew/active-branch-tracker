import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from '../mockHttpFunction';
import { mockCreatePayload } from '../../../src/webhook/create';
import { getFullBranchName } from '../../util';

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

describe('A branch creation payload is received', () => {
  beforeEach(async () => {
    await testEnv.clearFirestore();
  });
  
  it('tests a new branch creation', async () => {
    try {
      await mockWebhookPayload('create', mockCreatePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { ref: branchName } = mockCreatePayload;

    const fullBranchName = getFullBranchName(mockCreatePayload, branchName);

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);

      const branchSnapshot = await getDoc(branchRef);

      expect(branchSnapshot.data()).to.include({
        checkSuiteRuns: 0,
        checkSuiteFailures: 0,
        checkSuiteStatus: 'neutral',
        tracked: false,
        // cannot test created at because it is always "now"
      });
    });
  });
});
