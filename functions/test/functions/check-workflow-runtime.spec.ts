import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

import firebaseTest from 'firebase-functions-test';
const functionsTest = firebaseTest({ projectId: 'demo-project' });

import { checkWorkflowRuntime } from '../../src';

const projectId = process.env.GCLOUD_PROJECT ?? 'demo-project';
let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  // setLogLevel('error');

  testEnv = await initializeTestEnvironment({
    firestore: {
      port: 8080,
      host: 'localhost',
    },
    projectId,
  });
});

describe('Checks workflow runtime for fastest run', () => {
  jest.setTimeout(10000);
  it('records very first runtime', async () => {
    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();

      const workflowDocPath = 'workflows/active-branch-tracker-8539638';
      const workflowDocRef = doc(db, workflowDocPath);
      await setDoc(workflowDocRef, { name: 'test cloud functions' });

      const wrapped = functionsTest.wrap(checkWorkflowRuntime);

      const after = functionsTest.firestore.makeDocumentSnapshot(
        {
          htmlUrl:
            'https://github.com/ideacrew/active-branch-tracker/actions/runs/1321542128',
          repositoryName: 'active-branch-tracker',
          runId: 1321542128,
          runStartedAt: '2021-10-08T18:58:09Z',
          runtime: 44000,
          updatedAt: '2021-10-08T18:58:53Z',
          workflowId: '8539638',
          workflowName: 'test cloud functions',
        },
        `workflows/active-branch-tracker-8539638/runs/1321542128`,
      );

      await wrapped(after, {
        params: {
          workflowId: 'active-branch-tracker-8539638',
          runId: '1321542128',
        },
      });

      const workflowSnap = await getDoc(workflowDocRef);

      expect(workflowSnap.data()).toMatchObject({
        name: 'test cloud functions',
        fastestRun: {
          runId: 1321542128,
          runtime: 44000,
        },
      });
    });
  });

  it('records a faster runtime than what exists', async () => {
    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();

      const workflowDocPath = 'workflows/active-branch-tracker-8539638';
      const workflowDocRef = doc(db, workflowDocPath);
      await setDoc(workflowDocRef, {
        name: 'test cloud functions',
        fastestRun: { runId: 1234, runtime: 23423223 },
      });

      const wrapped = functionsTest.wrap(checkWorkflowRuntime);

      const after = functionsTest.firestore.makeDocumentSnapshot(
        {
          htmlUrl:
            'https://github.com/ideacrew/active-branch-tracker/actions/runs/1321542128',
          repositoryName: 'active-branch-tracker',
          runId: 1321542128,
          runStartedAt: '2021-10-08T18:58:09Z',
          runtime: 44000,
          updatedAt: '2021-10-08T18:58:53Z',
          workflowId: '8539638',
          workflowName: 'test cloud functions',
        },
        `workflows/active-branch-tracker-8539638/runs/1321542128`,
      );

      await wrapped(after, {
        params: {
          workflowId: 'active-branch-tracker-8539638',
          runId: '1321542128',
        },
      });

      const workflowSnap = await getDoc(workflowDocRef);

      expect(workflowSnap.data()).toMatchObject({
        name: 'test cloud functions',
        fastestRun: {
          runId: 1321542128,
          runtime: 44000,
        },
      });
    });
  });

  it('does not record a runtime that is slower than what exists', async () => {
    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();

      const workflowDocPath = 'workflows/active-branch-tracker-8539638';
      const workflowDocRef = doc(db, workflowDocPath);
      await setDoc(workflowDocRef, {
        name: 'test cloud functions',
        fastestRun: { runId: 3454542128, runtime: 100 },
      });

      const wrapped = functionsTest.wrap(checkWorkflowRuntime);

      const after = functionsTest.firestore.makeDocumentSnapshot(
        {
          htmlUrl:
            'https://github.com/ideacrew/active-branch-tracker/actions/runs/1321542128',
          repositoryName: 'active-branch-tracker',
          runId: 1321542128,
          runStartedAt: '2021-10-08T18:58:09Z',
          runtime: 44000,
          updatedAt: '2021-10-08T18:58:53Z',
          workflowId: '8539638',
          workflowName: 'test cloud functions',
        },
        `workflows/active-branch-tracker-8539638/runs/1321542128`,
      );

      await wrapped(after, {
        params: {
          workflowId: 'active-branch-tracker-8539638',
          runId: '1321542128',
        },
      });

      const workflowSnap = await getDoc(workflowDocRef);

      expect(workflowSnap.data()).toMatchObject({
        name: 'test cloud functions',
        fastestRun: { runId: 3454542128, runtime: 100 },
      });
    });
  });
});
