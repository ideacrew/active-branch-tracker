import {
  mockCreateDefaultBranchPayload,
  mockCreateFeatureBranchPayload,
  mockPushEventPayload,
  mockWorkflowRun,
} from './src/webhook/mocks';
import { mockWebhookPayload } from './test/functions/webhook/mockHttpFunction';

const seedDatabase = async () => {
  // Default Branch
  await mockWebhookPayload('create', mockCreateDefaultBranchPayload('trunk'));
  await mockWebhookPayload('push', mockPushEventPayload('trunk'));

  // Feature Branch
  await mockWebhookPayload(
    'create',
    mockCreateFeatureBranchPayload('feature-branch'),
  );
  await mockWebhookPayload('push', mockPushEventPayload('feature-branch'));

  // Workflow Runs on feature branch
  const { requested, success } = mockWorkflowRun('test', 1, 'feature-branch');
  await mockWebhookPayload('workflow_run', requested);
  await mockWebhookPayload('workflow_run', success);
  const { requested: requested2, success: success2 } = mockWorkflowRun(
    'build',
    2,
    'feature-branch',
  );
  await mockWebhookPayload('workflow_run', requested2);
  await mockWebhookPayload('workflow_run', success2);

  // Workflow Runs on default branch
  const { requested: requested3, success: success3 } = mockWorkflowRun(
    'test',
    1,
    'trunk',
  );
  await mockWebhookPayload('workflow_run', requested3);
  await mockWebhookPayload('workflow_run', success3);
  const { requested: requested4, success: success4 } = mockWorkflowRun(
    'build',
    2,
    'trunk',
  );
  await mockWebhookPayload('workflow_run', requested4);
  await mockWebhookPayload('workflow_run', success4);
};

seedDatabase();
