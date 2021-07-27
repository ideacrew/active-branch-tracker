const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/dashboard',
    '<rootDir>/libs/branches/data-access',
    '<rootDir>/libs/branches/feature',
    '<rootDir>/libs/branches/ui-components',
    '<rootDir>/libs/display-config',
    '<rootDir>/libs/util',
    '<rootDir>/libs/environments/data-access',
    '<rootDir>/libs/environments/feature',
    '<rootDir>/libs/testing',
    '<rootDir>/libs/auth',
    '<rootDir>/libs/user/data-access',
    '<rootDir>/libs/pull-requests/data-access',
    '<rootDir>/libs/pull-requests/feature',
  ],
};
