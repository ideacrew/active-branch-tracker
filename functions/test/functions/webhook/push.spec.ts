import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';
import { faker } from '@faker-js/faker';

import { mockWebhookPayload } from './mockHttpFunction';
import { getFullBranchName } from '../../util';
import {
  mockCreateFeatureBranchPayload,
  mockPushEventPayload,
} from '../../../src/webhook/mocks';

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
  it('tests a new branch creation', async () => {
    const branchName = faker.git.branch();
    const pushPayload = mockPushEventPayload(branchName);
    const { head_commit } = pushPayload;
    try {
      await mockWebhookPayload(
        'create',
        mockCreateFeatureBranchPayload(branchName),
      );
      await mockWebhookPayload('push', pushPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const fullBranchName = getFullBranchName(pushPayload, branchName);

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);

      const branchSnapshot = await getDoc(branchRef);
      const branchDocument = branchSnapshot.data();

      expect(branchDocument.head_commit).toMatchObject({
        message: head_commit.message,
        id: head_commit.id,
      });
    });
  });
});
