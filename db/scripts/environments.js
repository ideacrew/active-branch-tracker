const faker = require('faker/locale/en_US');
const firebase = require('@firebase/rules-unit-testing');
const { randomRepo } = require('./util');
const { orgs, repos } = require('./branches');

const environments = ['prod', 'pre-prod', 'development'];

async function seedEnvironments(projectId) {
  const admin = firebase.initializeAdminApp({ projectId }).firestore();

  for (const org of orgs) {
    for (const env of environments) {
      const environment = {
        name: env,
        owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
        latestDeployment: {
          app: faker.commerce.productName(),
          repo: randomRepo(),
          org,
        },
      };

      await admin.doc(`environments/${org}-${env}`).set(environment);
    }
  }
}

module.exports = {
  seedEnvironments,
};
