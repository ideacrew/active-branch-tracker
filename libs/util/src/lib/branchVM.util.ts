import { BranchInfo } from './models';

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
    ((checkSuiteRuns - checkSuiteFailures) / checkSuiteRuns) * 100,
  );
}

export function getActionsLink(branch: BranchInfo): string {
  const { repositoryName, organizationName, branchName } = branch;

  return `https://github.com/${organizationName}/${repositoryName}/actions?query=branch%3A${branchName}+workflow%3Afull-check-suite`;
}
