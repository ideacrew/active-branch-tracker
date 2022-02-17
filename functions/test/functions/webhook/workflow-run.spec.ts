import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setLogLevel } from 'firebase/firestore';
import { faker } from '@faker-js/faker';

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

describe('Workflow run tests', () => {
  describe('updating workflow results list in branch document', () => {
    const workflowName = faker.hacker.verb();
    const head_branch = faker.git.branch();
    const workflowId = faker.datatype.number({ min: 100_000, max: 999_999 });

    const { requested, success, failure } = mockWorkflowRun(
      workflowName,
      workflowId,
      head_branch,
    );

    beforeEach(async () => {
      await mockWebhookPayload(
        'create',
        mockCreateFeatureBranchPayload(head_branch),
      );
      await mockWebhookPayload('push', mockPushEventPayload(head_branch));
      await mockWebhookPayload('workflow_run', requested);
    });

    it('tests a first-time requested workflow run', async () => {
      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(
          context.firestore(),
          branchPath(head_branch),
        );

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).toMatchObject({
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
        const branchReference = doc(
          context.firestore(),
          branchPath(head_branch),
        );

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).toMatchObject({
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
        const branchReference = doc(
          context.firestore(),
          branchPath(head_branch),
        );

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).toMatchObject({
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
      await mockWebhookPayload('workflow_run', requested);
      await mockWebhookPayload('workflow_run', success);

      // Second workflow run requested
      const { requested: requested2, success: success2 } = mockWorkflowRun(
        'build',
        2,
        head_branch,
      );
      await mockWebhookPayload('workflow_run', requested2);
      await mockWebhookPayload('workflow_run', success2);

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(
          context.firestore(),
          branchPath(head_branch),
        );

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults).toHaveLength(2);
      });
    });
  });

  // This spec should ideally exist inside the /src directory, but I only have
  // specs running out of the /test directory.
  describe('logic around updating results array', () => {
    const branchName = faker.git.branch();

    beforeEach(async () => {
      await mockWebhookPayload(
        'create',
        mockCreateFeatureBranchPayload(branchName),
      );
      await mockWebhookPayload('push', mockPushEventPayload(branchName));
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

      expect(newWorkflowResults).toHaveLength(1);
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

      expect(newWorkflowResults).toHaveLength(1);
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

      expect(newWorkflowResults).toHaveLength(2);
    });
  });

  describe('Recording workflow runtimes on the default branch', () => {
    const defaultBranch = faker.git.branch();
    const createDefaultBranchPayload =
      mockCreateDefaultBranchPayload(defaultBranch);

    beforeEach(async () => {
      // need default branches to test workflow runtime recording
      await mockWebhookPayload('create', createDefaultBranchPayload);
    });

    it('records workflow name on a first-time successful workflow run', async () => {
      const { success } = mockWorkflowRun('test', 1, defaultBranch);

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

        expect(workflowDocument).toMatchObject({
          name: 'test',
        });
      });
    });

    xit('records a workflow run', async () => {
      const { success } = mockWorkflowRun('test', 1, defaultBranch);
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

        expect(workflowDocument).toMatchObject({
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

const branchPath = (branchName: string): string =>
  `branches/mock-organization-mock-repository-${branchName}`;
