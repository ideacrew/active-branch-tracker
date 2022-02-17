import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';
import { faker } from '@faker-js/faker';

import {
  mockCreateFeatureBranchPayload,
  mockDeleteEventPayload,
} from '../../../src/webhook/mocks';

import { mockWebhookPayload } from './mockHttpFunction';
import { getFullBranchName } from '../../util';

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
  it('tests branch deletion', async () => {
    const branchName = faker.git.branch();
    const mockDeletePayload = mockDeleteEventPayload(branchName);
    try {
      await mockWebhookPayload(
        'create',
        mockCreateFeatureBranchPayload(branchName),
      );
      await mockWebhookPayload('delete', mockDeletePayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const fullBranchName = getFullBranchName(mockDeletePayload, branchName);

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);

      const branchSnapshot = await getDoc(branchRef);

      expect(branchSnapshot.data()).toBeUndefined();
    });
  });
});
