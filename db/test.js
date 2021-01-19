const fs = require('fs');
const path = require('path');
const firebase = require('@firebase/rules-unit-testing');
const TEST_FIREBASE_PROJECT_ID = 'test-firestore-rules-project';
const port = require('../firebase.json').emulators.firestore.port || 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${TEST_FIREBASE_PROJECT_ID}:ruleCoverage.html`;

const philAuth = {
  uid: 'phil',
  email: 'phil@example.com',
};
const lemAuth = { uid: 'lem', email: 'lem@example.com' };

before(async () => {
  const rulesContent = fs.readFileSync(
    path.resolve(__dirname, '../firestore.rules'),
    'utf8',
  );
  await firebase.loadFirestoreRules({
    projectId: TEST_FIREBASE_PROJECT_ID,
    rules: rulesContent,
  });
});

describe('testing assertions', () => {
  const noUserDb = firebase
    .initializeTestApp({
      projectId: TEST_FIREBASE_PROJECT_ID,
      auth: null,
    })
    .firestore();

  const philDb = firebase
    .initializeTestApp({
      projectId: TEST_FIREBASE_PROJECT_ID,
      auth: philAuth,
    })
    .firestore();

  const lemDb = firebase
    .initializeTestApp({
      projectId: TEST_FIREBASE_PROJECT_ID,
      auth: lemAuth,
    })
    .firestore();

  const admin = firebase
    .initializeAdminApp({
      projectId: TEST_FIREBASE_PROJECT_ID,
    })
    .firestore();

  const branchDoc = 'branches/feature-2.1';

  it(`allows anyone to read all branches`, async () => {
    await firebase.assertSucceeds(philDb.doc(branchDoc).get());
    await firebase.assertSucceeds(lemDb.doc(branchDoc).get());
  });

  it(`can only update a branch if logged in`, async () => {
    await admin.doc(branchDoc).set({ content: 'before' });

    await firebase.assertSucceeds(
      philDb.doc(branchDoc).update({ content: 'after' }),
    );
    await firebase.assertSucceeds(
      lemDb.doc(branchDoc).update({ content: 'after' }),
    );
    await firebase.assertFails(
      noUserDb.doc(branchDoc).update({ content: 'after' }),
    );
  });

  it(`can only read and update an environment if logged in`, async () => {
    const envDoc = 'environments/pvt-2';
    await admin.doc(envDoc).set({ content: 'before' });

    await firebase.assertFails(noUserDb.doc(envDoc).get());
    await firebase.assertFails(
      noUserDb.doc(envDoc).update({ content: 'after' }),
    );
    await firebase.assertSucceeds(lemDb.doc(envDoc).get());
    await firebase.assertSucceeds(
      lemDb.doc(envDoc).update({ content: 'after' }),
    );
  });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});
