export function createSafeBranchName(branchName: string): string {
  return branchName.replace(/tags\//, '').replace(/\//g, '-');
}

const s = {
  branch: 'tags/5.7.1',
  env: 'prod',
  app: 'enroll',
  user_name: 'matt-williams',
  commit_sha: 'f20127d',
  org: 'dchbx',
  repo: 'enroll',
};
