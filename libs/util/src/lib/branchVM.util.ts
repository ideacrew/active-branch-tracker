import { BranchInfo } from '@idc/branches/data-access';

export function getBranchLink(branch: BranchInfo): string {
  const {
    repositoryName,
    organizationName,
    branchName: headBranch,
    defaultBranch,
  } = branch;

  const needsTree = defaultBranch ? `` : `tree/`;

  return `//github.com/${organizationName}/${repositoryName}/${needsTree}${headBranch}`;
}

export function getCommitLink(branch: BranchInfo): string {
  const { repositoryName, organizationName, head_sha } = branch;

  return `//github.com/${organizationName}/${repositoryName}/commit/${head_sha}`;
}

export function getPullRequestLink(branch: BranchInfo): string {
  const { repositoryName, organizationName, pullRequestNumber } = branch;

  return `//github.com/${organizationName}/${repositoryName}/pull/${pullRequestNumber}`;
}

export function getFailurePercentage(branch: BranchInfo): number {
  const { checkSuiteRuns, checkSuiteFailures } = branch;

  return Math.round(
    ((checkSuiteRuns - checkSuiteFailures) / checkSuiteRuns) * 100
  );
}
