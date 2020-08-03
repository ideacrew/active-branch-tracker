export function createSafeBranchName(branchName: string): string {
  return branchName.replace(/tags\//, '').replace(/\//g, '-');
}
