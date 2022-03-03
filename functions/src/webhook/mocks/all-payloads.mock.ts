import { faker } from '@faker-js/faker';

import {
  mockCreateDefaultBranchPayload,
  mockCreateFeatureBranchPayload,
} from './create.mock';
import { mockDeleteEventPayload } from './delete.mock';
import { mockPushEventPayload } from './push.mock';
import { BaseDetails } from './webhook.mock';
import { mockWorkflowRun } from './workflow-run.mock';

export const allPayloads = () => {
  const defaultBranchName = `default-${faker.git.branch()}`;
  const featureBranchName = `feature-${faker.git.branch()}`;

  const baseDetails: BaseDetails = {
    organization: faker.random.word().toLowerCase(),
    repository: faker.random.word().toLowerCase(),
  };

  const createDefaultBranchPayload = mockCreateDefaultBranchPayload(
    defaultBranchName,
    baseDetails,
  );

  const createFeatureBranchPayload = mockCreateFeatureBranchPayload(
    featureBranchName,
    baseDetails,
  );

  const deleteBranchPayload = mockDeleteEventPayload(
    featureBranchName,
    baseDetails,
  );

  const pushPayload = mockPushEventPayload(featureBranchName, baseDetails);

  const workflowRun1 = mockWorkflowRun(
    'workflow-1',
    1,
    featureBranchName,
    baseDetails,
  );

  const workflowRun2 = mockWorkflowRun(
    'workflow-2',
    2,
    featureBranchName,
    baseDetails,
  );

  const defaultWorkflowRun1 = mockWorkflowRun(
    'workflow-3',
    3,
    defaultBranchName,
    baseDetails,
  );

  return {
    featureBranchName,
    defaultBranchName,
    createDefaultBranchPayload,
    createFeatureBranchPayload,
    deleteBranchPayload,
    pushPayload,
    workflowRun1,
    workflowRun2,
    defaultWorkflowRun1,
  };
};
