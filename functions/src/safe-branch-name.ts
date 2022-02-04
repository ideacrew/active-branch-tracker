/**
 * Returns a safe branch name for storing in Firestore
 * @param {string} branchName
 * @return {string} safe branch name
 */
export const createSafeBranchName = (branchName: string): string =>
  branchName.replace(/tags\//, '').replace(/\//g, '-');
