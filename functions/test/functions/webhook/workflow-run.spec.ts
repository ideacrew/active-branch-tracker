import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, setLogLevel } from 'firebase/firestore';

import { mockWebhookPayload } from './mockHttpFunction';
import { allPayloads } from '../../../src/webhook/mocks';
import { BranchInfo, FSWorkflowRun } from '../../../src/models';
import { updateWorkflowResults } from '../../../src/webhook/workflow-run/update-workflow-results';
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

describe('Workflow run tests', () => {
  describe('updating workflow results list in branch document', () => {
    it('tests a first-time requested workflow run', async () => {
      const {
        createFeatureBranchPayload,
        workflowRun1,
        featureBranchName: branchName,
      } = allPayloads();
      const { requested } = workflowRun1;
      const branchPath = getFullBranchName(
        createFeatureBranchPayload,
        branchName,
      );
      const branchDoc: Partial<BranchInfo> = {
        branchName,
        workflowResults: [],
        defaultBranch: false,
      };

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(
          context.firestore(),
          `branches/${branchPath}`,
        );
        await setDoc(branchReference, branchDoc);
        await mockWebhookPayload('workflow_run', requested);
        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).toMatchObject({
          runtime: 0,
          conclusion: null,
          action: 'requested',
        });
      });
    });

    it('tests a successful workflow run', async () => {
      const {
        createFeatureBranchPayload,
        workflowRun1,
        featureBranchName: branchName,
      } = allPayloads();

      const { success } = workflowRun1;

      const branchPath = getFullBranchName(
        createFeatureBranchPayload,
        branchName,
      );

      const branchDoc: Partial<BranchInfo> = {
        branchName,
        workflowResults: [],
        defaultBranch: false,
      };

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(
          context.firestore(),
          `branches/${branchPath}`,
        );

        await setDoc(branchReference, branchDoc);
        await mockWebhookPayload('workflow_run', success);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).toMatchObject({
          conclusion: 'success',
          action: 'completed',
        });
      });
    });

    it('tests a failed workflow run', async () => {
      const {
        createFeatureBranchPayload,
        workflowRun1,
        featureBranchName: branchName,
      } = allPayloads();

      const { failure } = workflowRun1;

      const branchPath = getFullBranchName(
        createFeatureBranchPayload,
        branchName,
      );

      const branchDoc: Partial<BranchInfo> = {
        branchName,
        workflowResults: [],
        defaultBranch: false,
      };

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(
          context.firestore(),
          `branches/${branchPath}`,
        );

        await setDoc(branchReference, branchDoc);
        await mockWebhookPayload('workflow_run', failure);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults[0]).toMatchObject({
          conclusion: 'failure',
          action: 'completed',
        });
      });
    });

    it('tests a second workflow run being requested', async () => {
      const {
        createFeatureBranchPayload,
        workflowRun1,
        workflowRun2,
        featureBranchName: branchName,
      } = allPayloads();

      const { success } = workflowRun1;

      const branchPath = getFullBranchName(
        createFeatureBranchPayload,
        branchName,
      );
      const { success: success2 } = workflowRun2;

      const branchDoc: Partial<BranchInfo> = {
        branchName,
        workflowResults: [],
        defaultBranch: false,
      };

      await testEnv.withSecurityRulesDisabled(async context => {
        const branchReference = doc(
          context.firestore(),
          `branches/${branchPath}`,
        );

        await setDoc(branchReference, branchDoc);

        await mockWebhookPayload('workflow_run', success);
        await mockWebhookPayload('workflow_run', success2);

        const branchSnapshot = await getDoc(branchReference);
        const { workflowResults } = branchSnapshot.data();

        expect(workflowResults).toHaveLength(2);
      });
    });
  });

  // This spec should ideally exist inside the /src directory, but I only have
  // specs running out of the /test directory.
  describe('logic around updating results array', () => {
    const now = new Date();
    const runStartedAt = now.toISOString();
    const updatedAt = new Date(now.getTime() + 100_000).toISOString();
    it('tests adding a new workflow to an empty results list', async () => {
      const existingWorkflowResults: FSWorkflowRun[] = [];
      const newWorkflowRun: FSWorkflowRun = {
        htmlUrl: 'https://github.com',
        runtime: 100_000,
        conclusion: 'success',
        runId: 2,
        workflowId: 2,
        action: 'completed',
        repositoryName: 'fake-repository',
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

    it('tests updating a single workflow result in the array', async () => {
      const existingWorkflowResults: FSWorkflowRun[] = [
        {
          htmlUrl: 'https://github.com',
          runtime: 100_000,
          conclusion: null,
          runId: 1,
          workflowId: 1,
          action: 'requested',
          repositoryName: 'fake-repo',
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
        repositoryName: 'fake-repo',
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

    it('tests adding a new workflow result to an existing array', async () => {
      const existingWorkflowResults: FSWorkflowRun[] = [
        {
          htmlUrl: 'https://github.com',
          runtime: 100_000,
          conclusion: 'success',
          runId: 1,
          workflowId: 1,
          action: 'completed',
          repositoryName: 'fake-repo',
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
        repositoryName: 'fake-repo',
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
    it('records workflow name on a first-time successful workflow run', async () => {
      const {
        defaultWorkflowRun1,
        defaultBranchName: branchName,
      } = allPayloads();
      const { success } = defaultWorkflowRun1;
      const { repository, workflow_run } = success;
      const workflowPath = `workflows/${repository.name}-${workflow_run.workflow_id}`;

      const branchDoc: Partial<BranchInfo> = {
        branchName,
        workflowResults: [],
        defaultBranch: true,
      };

      const branchPath = getFullBranchName(success, branchName);

      await testEnv.withSecurityRulesDisabled(async context => {
        const db = context.firestore();
        const workflowRef = doc(db, workflowPath);
        const branchRef = doc(db, `branches/${branchPath}`);
        await setDoc(branchRef, branchDoc);
        await mockWebhookPayload('workflow_run', success);
        const workflowSnapshot = await getDoc(workflowRef);
        const workflowDocument = workflowSnapshot.data();

        expect(workflowDocument).toMatchObject({
          name: workflow_run.name,
        });
      });
    });

    it('records a workflow run', async () => {
      const { defaultWorkflowRun1, defaultBranchName: branchName } =
        allPayloads();
      const { success } = defaultWorkflowRun1;

      const { repository, workflow_run } = success;

      const workflowRunPath = `workflows/${repository.name}-${workflow_run.workflow_id}/runs/${workflow_run.id}`;

      const branchDoc: Partial<BranchInfo> = {
        branchName,
        workflowResults: [],
        defaultBranch: true,
      };

      await testEnv.withSecurityRulesDisabled(async context => {
        const db = context.firestore();
        const branchRef = doc(
          db,
          `branches/${getFullBranchName(success, branchName)}`,
        );
        const workflowRef = doc(db, workflowRunPath);
        await setDoc(branchRef, branchDoc);
        await mockWebhookPayload('workflow_run', success);
        const workflowSnapshot = await getDoc(workflowRef);
        const workflowDocument = workflowSnapshot.data();

        expect(workflowDocument).toMatchObject({
          action: 'completed',
          conclusion: 'success',
          htmlUrl: 'https://github.com',
          repositoryName: repository.name,
          runId: 1,
          runtime: 100_000,
          workflowId: 3,
          workflowName: workflow_run.name,
        });
      });
    });
  });
});
