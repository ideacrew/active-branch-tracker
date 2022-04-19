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
  it('complete pr workflow', async () => {
    const {
      opened,
      closedAndMerged,
      autoMergeEnabled,
      approved,
      prNumber,
      branchName,
    } = mockPullRequest();

    const prDocumentPath = `pullRequests/mock-organization-mock-repository-${prNumber}`;
    await testEnv.withSecurityRulesDisabled(async context => {
      await mockWebhookPayload('pull_request', opened);
      await mockWebhookPayload('pull_request', autoMergeEnabled);
      await mockWebhookPayload('pull_request', closedAndMerged);
      await mockWebhookPayload('pull_request_review', approved);

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
      });

      expect(prSnapshot.data()).toHaveProperty('mergedAt');
      expect(prSnapshot.data()).toHaveProperty('autoMergeEnabled');
      expect(prSnapshot.data()).toHaveProperty('createdAt');
      expect(prSnapshot.data()).toHaveProperty('approvedAt');
    });
  });
});
