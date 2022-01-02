/**
 * Returns a safe branch name for storing in Firestore
 * @param {string} branchName
 * @return {string} safe branch name
 */
export function createSafeBranchName(branchName: string): string {
  return branchName.replace(/tags\//, '').replace(/\//g, '-');
}
