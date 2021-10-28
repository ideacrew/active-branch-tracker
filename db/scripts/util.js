const orgs = ['org1', 'org2', 'org3'];
const repos = ['repo1', 'repo2', 'repo3'];
const defaultBranchName = 'main';
const branchCollection = 'branches';

/**
 * Helper method for grabbing a random repo name
 */
function randomRepo() {
  const randomIndex = Math.floor(Math.random() * repos.length);
  return repos[randomIndex];
}

/**
 * Helper method for grabbing a random org name
 */
function randomOrg() {
  const randomIndex = Math.floor(Math.random() * orgs.length);
  return orgs[randomIndex];
}

module.exports = {
  randomRepo,
  randomOrg,
  orgs,
  repos,
  defaultBranchName,
  branchCollection,
};
