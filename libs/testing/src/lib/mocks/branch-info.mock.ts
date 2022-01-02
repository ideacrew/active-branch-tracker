import * as faker from 'faker';

import { BranchInfo } from '@idc/util';

export const mockDefaultBranchInfo = (): BranchInfo => {
  const organizationName = 'org-name';
  const repositoryName = 'repo-name';
  const branchName = faker.random.word();

  const today = new Date();

  return {
    organizationName,
    repositoryName,
    branchName,
    defaultBranch: true,
    checkSuiteRuns: 100,
    checkSuiteFailures: 0,
    checkSuiteStatus: 'success',
    tracked: true,
    timestamp: today.getTime(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    created_at: today.toISOString(),
  };
};
