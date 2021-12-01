import { createSafeBranchName } from '../../src/safeBranchName';
import { WebhookPayload } from '../../src/webhook/interfaces';

export const getFullBranchName = (
  payload: WebhookPayload,
  branchName: string,
): string => {
  const { repository, organization } = payload;
  const { login: organizationName } = organization;
  const { name: repositoryName } = repository;
  const safeBranchName = createSafeBranchName(branchName);

  const branchPath = `${organizationName}-${repositoryName}-${safeBranchName}`;

  return branchPath;
};
