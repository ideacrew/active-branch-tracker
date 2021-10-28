const faker = require('faker/locale/en_US');
const firebase = require('@firebase/rules-unit-testing');
const { orgs, repos, defaultBranchName, branchCollection } = require('./util');

/**
 * Generates branches
 * @param {boolean} defaultBranch
 * @returns {Promise<void>}
 */
function generateBranch(
  organizationName,
  repositoryName,
  defaultBranch = false,
) {
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const branchName = defaultBranch ? defaultBranchName : faker.git.branch();

  const head_commit = {
    id: 'abcd123',
    committer: {
      name,
    },
    author: {
      name,
    },
    timestamp: faker.date.past().toISOString(),
  };

  const branchInfo = {
    repositoryName,
    head_commit,
    organizationName,
    branchName,
    checkSuiteStatus: 'success',
    checkSuiteRuns: faker.random.number({ min: 25, max: 50 }),
    checkSuiteFailures: faker.random.number({ min: 0, max: 5 }),
    defaultBranch,
    status: 'Development',
    tracked: faker.datatype.boolean(),
    timestamp: new Date().getTime(),
    head_sha: faker.git.shortSha(),
    updated_at: faker.date.past().toISOString(),
  };

  const docPath = `${branchCollection}/${organizationName}-${repositoryName}-${branchName}`;

  return { path: docPath, branch: branchInfo };
}

async function seedBranches(projectId) {
  const admin = firebase.initializeAdminApp({ projectId }).firestore();

  for (const org of orgs) {
    for (const repo of repos) {
      // Create default branch
      const { path: defaultPath, branch: defaultBranch } = generateBranch(
        org,
        repo,
        true,
      );
      await admin.doc(defaultPath).set(defaultBranch);

      // Create feature branch
      const { path, branch } = generateBranch(org, repo);

      await admin.doc(path).set(branch);
    }
  }
}

module.exports = {
  seedBranches,
  orgs,
  repos,
};
