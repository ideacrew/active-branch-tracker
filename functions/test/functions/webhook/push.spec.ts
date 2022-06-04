import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from './mockHttpFunction';
import { getFullBranchName } from '../../util';
import { allPayloads } from '../../../src/webhook/mocks';
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

describe('A push payload is received', () => {
  jest.setTimeout(10000);
  it('tests a new branch creation', async () => {
    const { pushPayload, featureBranchName: branchName } = allPayloads();
    const { head_commit } = pushPayload;

    const fullBranchName = getFullBranchName(pushPayload, branchName);

    const branchDoc: Partial<BranchInfo> = {
      branchName,
      defaultBranch: false,
    };

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);
      await setDoc(branchRef, branchDoc);
      await mockWebhookPayload('push', pushPayload);
      const branchSnapshot = await getDoc(branchRef);
      const branchDocument = branchSnapshot.data() as BranchInfo;

      expect(branchDocument.head_commit).toMatchObject({
        message: head_commit.message,
        id: head_commit.id,
      });
    });
  });
});
