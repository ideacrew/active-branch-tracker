import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';
import { faker } from '@faker-js/faker';

import { mockWebhookPayload } from './mockHttpFunction';
import { mockCreateFeatureBranchPayload } from '../../../src/webhook/mocks';
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

describe('A branch creation payload is received', () => {
  it('tests a new branch creation', async () => {
    const branchName = faker.git.branch();
    const createPayload = mockCreateFeatureBranchPayload(branchName);

    try {
      await mockWebhookPayload('create', createPayload);
    } catch (e) {
      console.error('ERROR:', e);
    }

    const { sender, organization, repository } = createPayload;

    const fullBranchName = getFullBranchName(createPayload, branchName);

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);

      const branchSnapshot = await getDoc(branchRef);

      expect(branchSnapshot.data()).toMatchObject({
        branchName,
        createdBy: sender.login,
        defaultBranch: false,
        organizationName: organization.login,
        repositoryName: repository.name,
        tracked: false,
      });
    });
  });
});
