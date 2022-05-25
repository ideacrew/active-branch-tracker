import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, setLogLevel } from 'firebase/firestore';

import { allPayloads } from '../../../src/webhook/mocks';
import { mockWebhookPayload } from './mockHttpFunction';
import { getFullBranchName } from '../../util';
import { BranchInfo } from '../../../src/models';

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

describe('Delete event tests', () => {
  jest.setTimeout(100000);
  it('tests branch deletion', async () => {
    const { deleteBranchPayload, featureBranchName: branchName } =
      allPayloads();

    const branchDoc: Partial<BranchInfo> = {
      branchName,
      defaultBranch: false,
    };

    const fullBranchName = getFullBranchName(deleteBranchPayload, branchName);

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);
      await setDoc(branchRef, branchDoc);
      await mockWebhookPayload('delete', deleteBranchPayload);
      const branchSnapshot = await getDoc(branchRef);

      expect(branchSnapshot.data()).toBeUndefined();
    });
  });
});
