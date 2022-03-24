import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from './mockHttpFunction';
import { allPayloads } from '../../../src/webhook/mocks';
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
  it('tests a new default branch creation', async () => {
    const { createDefaultBranchPayload } = allPayloads();

    const {
      sender,
      organization,
      repository,
      ref: branchName,
    } = createDefaultBranchPayload;

    const fullBranchName = getFullBranchName(
      createDefaultBranchPayload,
      branchName,
    );

    await testEnv.withSecurityRulesDisabled(async context => {
      await mockWebhookPayload('create', createDefaultBranchPayload);

      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);

      const branchSnapshot = await getDoc(branchRef);

      expect(branchSnapshot.data()).toMatchObject({
        branchName,
        createdBy: sender.login,
        defaultBranch: true,
        organizationName: organization.login,
        repositoryName: repository.name,
        tracked: false,
      });
    });
  });

  it('tests a new feature branch creation', async () => {
    const { createFeatureBranchPayload } = allPayloads();

    const {
      sender,
      organization,
      repository,
      ref: branchName,
    } = createFeatureBranchPayload;

    const fullBranchName = getFullBranchName(
      createFeatureBranchPayload,
      branchName,
    );

    await testEnv.withSecurityRulesDisabled(async context => {
      const branchRef = doc(context.firestore(), `branches/${fullBranchName}`);
      await mockWebhookPayload('create', createFeatureBranchPayload);
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
