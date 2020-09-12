const firebase = require('@firebase/testing');
const { seedBranches } = require('./branches');
const { seedEnvironments } = require('./environments');
const projectId = 'active-branches-report';

/**
 * Seeds the DB
 */
async function seedDb() {
  // Start by clearing the database of all data
  await firebase.clearFirestoreData({ projectId });

  await seedBranches(projectId);
  await seedEnvironments(projectId);

  // Need to explicitly exit or Node will just run forever
  process.exit();
}

seedDb();
