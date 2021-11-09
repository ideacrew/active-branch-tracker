/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { BranchInfo } from './models';

export const getCommitLink = (branch: BranchInfo): string => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { repositoryName, organizationName, head_sha } = branch;

  return `//github.com/${organizationName}/${repositoryName}/commit/${head_sha}`;
};

export const getPullRequestLink = (branch: BranchInfo): string => {
  const { repositoryName, organizationName, pullRequestNumber } = branch;

  return `//github.com/${organizationName}/${repositoryName}/pull/${pullRequestNumber}`;
};

export const getFailurePercentage = (branch: BranchInfo): number => {
  const { checkSuiteRuns, checkSuiteFailures } = branch;

  return Math.round(
    ((checkSuiteRuns - checkSuiteFailures) / checkSuiteRuns) * 100,
  );
};

export const getActionsLink = (branch: BranchInfo): string => {
  const { repositoryName, organizationName, branchName } = branch;

  return `https://github.com/${organizationName}/${repositoryName}/actions?query=branch%3A${branchName}+workflow%3Afull-check-suite`;
};
