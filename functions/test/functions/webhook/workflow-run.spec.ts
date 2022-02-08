import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from './mockHttpFunction';

import {
  mockCreateDefaultBranchPayload,
  mockCreateFeatureBranchPayload,
  mockPushEventPayload,
  mockWorkflowRun,
} from '../../../src/webhook/mocks';
import { FSWorkflowRun } from '../../../src/models';
import { updateWorkflowResults } from '../../../src/webhook/workflow-run/update-workflow-results';

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

describe('Workflow run tests', () => {
  const branchPath =
    'branches/mock-organization-mock-repository-feature-branch';

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  describe('updating workflow results list in branch document', () => {
    const { requested, success, failure } = mockWorkflowRun();

    beforeEach(async () => {
      await mockWebhookPayload('create', mockCreateFeatureBranchPayload);
      await mockWebhookPayload('push', mockPushEventPayload);
      await mockWebhookPayload('workflow_run', requested);
    });
    it('tests a first-time requested workflow run', async () => {
      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(context.firestore(), branchPath);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).to.include({
          htmlUrl: 'https://github.com',
          runtime: 0,
          conclusion: null,
          repositoryName: 'mock-repository',
          action: 'requested',
        });
      });
    });
    it('tests a successful workflow run', async () => {
      try {
        await mockWebhookPayload('workflow_run', success);
      } catch (error) {
        console.error('ERROR:', error);
      }

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(context.firestore(), branchPath);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).to.include({
          htmlUrl: 'https://github.com',
          runtime: 100_000,
          conclusion: 'success',
          repositoryName: 'mock-repository',
          action: 'completed',
        });
      });
    });
    it('tests a failed workflow run', async () => {
      try {
        await mockWebhookPayload('workflow_run', failure);
      } catch (error) {
        console.error('ERROR:', error);
      }

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(context.firestore(), branchPath);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).to.include({
          htmlUrl: 'https://github.com',
          runtime: 100_000,
          conclusion: 'failure',
          repositoryName: 'mock-repository',
          action: 'completed',
        });
      });
    });

    it('tests a second workflow run being requested', async () => {
      // First workflow run requested and completed
      const { requested, success } = mockWorkflowRun();
      await mockWebhookPayload('workflow_run', requested);
      await mockWebhookPayload('workflow_run', success);

      // Second workflow run requested
      const { requested: requested2, success: success2 } = mockWorkflowRun(
        'build',
        2,
      );
      await mockWebhookPayload('workflow_run', requested2);
      await mockWebhookPayload('workflow_run', success2);

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(context.firestore(), branchPath);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults).to.have.length(2);
      });
    });
  });

  // This spec should ideally exist inside the /src directory, but I only have
  // specs running out of the /test directory.
  describe('logic around updating results array', () => {
    beforeEach(async () => {
      await mockWebhookPayload('create', mockCreateFeatureBranchPayload);
      await mockWebhookPayload('push', mockPushEventPayload);
    });
    const now = new Date();
    const runStartedAt = now.toISOString();
    const updatedAt = new Date(now.getTime() + 100_000).toISOString();
    it('tests adding a new workflow to an empty results list', () => {
      const existingWorkflowResults: FSWorkflowRun[] = [];

      const newWorkflowRun: FSWorkflowRun = {
        htmlUrl: 'https://github.com',
        runtime: 100_000,
        conclusion: 'success',
        runId: 2,
        workflowId: 2,
        action: 'completed',
        repositoryName: 'mock-repository',
        runStartedAt,
        updatedAt,
        workflowName: 'build-workflow',
      };

      const newWorkflowResults = updateWorkflowResults(
        existingWorkflowResults,
        newWorkflowRun,
      );

      expect(newWorkflowResults).to.have.length(1);
    });

    it('tests updating a single workflow result in the array', () => {
      const existingWorkflowResults: FSWorkflowRun[] = [
        {
          htmlUrl: 'https://github.com',
          runtime: 100_000,
          conclusion: null,
          runId: 1,
          workflowId: 1,
          action: 'requested',
          repositoryName: 'mock-repository',
          runStartedAt,
          updatedAt: runStartedAt,
          workflowName: 'test-workflow',
        },
      ];

      const newWorkflowRun: FSWorkflowRun = {
        htmlUrl: 'https://github.com',
        runtime: 100_000,
        conclusion: 'success',
        runId: 2,
        workflowId: 1,
        action: 'completed',
        repositoryName: 'mock-repository',
        runStartedAt,
        updatedAt,
        workflowName: 'test-workflow',
      };

      const newWorkflowResults = updateWorkflowResults(
        existingWorkflowResults,
        newWorkflowRun,
      );

      expect(newWorkflowResults).to.have.length(1);
    });

    it('tests adding a new workflow result to an existing array', () => {
      const existingWorkflowResults: FSWorkflowRun[] = [
        {
          htmlUrl: 'https://github.com',
          runtime: 100_000,
          conclusion: 'success',
          runId: 1,
          workflowId: 1,
          action: 'completed',
          repositoryName: 'mock-repository',
          runStartedAt,
          updatedAt,
          workflowName: 'test-workflow',
        },
      ];

      const newWorkflowRun: FSWorkflowRun = {
        htmlUrl: 'https://github.com',
        runtime: 100_000,
        conclusion: 'success',
        runId: 2,
        workflowId: 2,
        action: 'completed',
        repositoryName: 'mock-repository',
        runStartedAt,
        updatedAt,
        workflowName: 'build-workflow',
      };

      const newWorkflowResults = updateWorkflowResults(
        existingWorkflowResults,
        newWorkflowRun,
      );

      expect(newWorkflowResults).to.have.length(2);
    });
  });

  describe('Recording workflow runtimes', () => {
    beforeEach(async () => {
      // need default branches to test workflow runtime recording
      await mockWebhookPayload('create', mockCreateDefaultBranchPayload);
    });

    it('records workflow name on a first-time successful workflow run', async () => {
      const { success } = mockWorkflowRun('test', 1, 'trunk');

      try {
        await mockWebhookPayload('workflow_run', success);
      } catch (error) {
        console.error('ERROR:', error);
      }

      const { repository, workflow_run } = success;

      const workflowPath = `workflows/${repository.name}-${workflow_run.workflow_id}`;

      await testEnv.withSecurityRulesDisabled(async context => {
        const workflowRef = doc(context.firestore(), workflowPath);

        const workflowSnapshot = await getDoc(workflowRef);
        const workflowDocument = workflowSnapshot.data();

        expect(workflowDocument).to.include({
          name: 'test',
        });
      });
    });

    it('records a workflow run', async () => {
      const { success } = mockWorkflowRun('test', 1, 'trunk');
      try {
        await mockWebhookPayload('workflow_run', success);
      } catch (error) {
        console.error('ERROR:', error);
      }

      const { repository, workflow_run } = success;

      const workflowRunPath = `workflows/${repository.name}-${workflow_run.workflow_id}/runs/${workflow_run.id}`;

      await testEnv.withSecurityRulesDisabled(async context => {
        const workflowRef = doc(context.firestore(), workflowRunPath);

        const workflowSnapshot = await getDoc(workflowRef);
        const workflowDocument = workflowSnapshot.data();

        expect(workflowDocument).to.include({
          action: 'completed',
          conclusion: 'success',
          htmlUrl: 'https://github.com',
          repositoryName: 'mock-repository',
          runId: 1,
          runtime: 100_000,
          workflowId: 1,
          workflowName: 'test',
        });
      });
    });
  });
});
