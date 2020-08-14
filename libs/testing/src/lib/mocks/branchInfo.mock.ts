import * as faker from 'faker';

import { BranchInfo, CheckSuiteConclusion } from '@idc/util';

export function mockDefaultBranchInfo(): BranchInfo {
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
    checkSuiteStatus: CheckSuiteConclusion.Success,
    tracked: true,
    timestamp: today.getTime(),
  };
}
