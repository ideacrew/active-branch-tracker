import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from './mockHttpFunction';
import { mockPullRequest } from '../../../src/webhook/mocks';

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

describe('Pull Request Event Payload', () => {
  jest.setTimeout(10000);
  it('complete pr workflow', async () => {
    const {
      opened,
      convertedToDraft,
      readyForReview,
      closedAndMerged,
      autoMergeEnabled,
      approved,
      prNumber,
      branchName,
    } = mockPullRequest();

    const prDocumentPath = `pullRequests/mock-organization-mock-repository-${prNumber}`;
    await testEnv.withSecurityRulesDisabled(async context => {
      await mockWebhookPayload('pull_request', opened);
      await mockWebhookPayload('pull_request', convertedToDraft);
      await mockWebhookPayload('pull_request', readyForReview);
      await mockWebhookPayload('pull_request', autoMergeEnabled);
      await mockWebhookPayload('pull_request_review', approved);
      await mockWebhookPayload('pull_request', closedAndMerged);

      const prRef = doc(context.firestore(), prDocumentPath);

      const prSnapshot = await getDoc(prRef);

      expect(prSnapshot.data()).toMatchObject({
        number: prNumber,
        author: 'mockUser',
        title: '',
        url: '',
        mergedBy: 'markgoho',
        stats: {
          additions: 1222,
          changed_files: 17,
          commits: 3,
          deletions: 10,
        },
        approvedBy: 'markgoho',
        branchName,
        targetBranch: 'trunk',
        autoMergeEnabledBy: 'markgoho',
      });

      // These are all timestamps, so just check that the property exists
      expect(prSnapshot.data()).toHaveProperty('mergedAt');
      expect(prSnapshot.data()).toHaveProperty('autoMergeEnabledAt');
      expect(prSnapshot.data()).toHaveProperty('createdAt');
      expect(prSnapshot.data()).toHaveProperty('approvedAt');
    });
  });

  it('pr opened and converted to draft', async () => {
    const { opened, convertedToDraft, prNumber } = mockPullRequest();

    const prDocumentPath = `pullRequests/mock-organization-mock-repository-${prNumber}`;

    await testEnv.withSecurityRulesDisabled(async context => {
      await mockWebhookPayload('pull_request', opened);
      await mockWebhookPayload('pull_request', convertedToDraft);

      const prRef = doc(context.firestore(), prDocumentPath);

      const prSnapshot = await getDoc(prRef);

      expect(prSnapshot.data()).toBeUndefined();
    });
  });
});
