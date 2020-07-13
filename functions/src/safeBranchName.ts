export function createSafeBranchName(branchName: string): string {
  return branchName.replace(/\//g, '-');
}
