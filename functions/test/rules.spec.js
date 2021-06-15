const fs = require('fs');
const path = require('path');
const firebase = require('@firebase/rules-unit-testing');
const DEMO_FIREBASE_PROJECT_ID = 'demo-project';
const port = require('../../firebase.json').emulators.firestore.port || 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${DEMO_FIREBASE_PROJECT_ID}:ruleCoverage.html`;

const philAuth = {
  uid: 'phil',
  email: 'phil@example.com',
};

const philUser = {
  orgs: ['dchbx', 'health-connector'],
  role: 'external',
};

const lemAuth = { uid: 'lem', email: 'lem@example.com' };

const lemUser = {
  orgs: ['ideacrew'],
  role: 'admin',
};

before(async () => {
  const rulesContent = fs.readFileSync(
    path.resolve(__dirname, '../../firestore.rules'),
    'utf8',
  );
  await firebase.loadFirestoreRules({
    projectId: DEMO_FIREBASE_PROJECT_ID,
    rules: rulesContent,
  });
});

describe('testing assertions', () => {
  const noUserDb = firebase
    .initializeTestApp({
      projectId: DEMO_FIREBASE_PROJECT_ID,
      auth: null,
    })
    .firestore();

  const philDb = firebase
    .initializeTestApp({
      projectId: DEMO_FIREBASE_PROJECT_ID,
      auth: philAuth,
    })
    .firestore();

  const lemDb = firebase
    .initializeTestApp({
      projectId: DEMO_FIREBASE_PROJECT_ID,
      auth: lemAuth,
    })
    .firestore();

  const admin = firebase
    .initializeAdminApp({
      projectId: DEMO_FIREBASE_PROJECT_ID,
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

  it(`can read and write an org if an admin`, async () => {
    const orgDoc = 'orgs/dchbx';
    await admin.doc('users/lem').set(lemUser);
    await admin.doc(orgDoc).set({ content: 'before' });

    await firebase.assertSucceeds(lemDb.doc(orgDoc).get());
    await firebase.assertSucceeds(
      lemDb.doc(orgDoc).update({ content: 'after' }),
    );
  });

  it(`can read but not write an org if member of org`, async () => {
    const orgDoc = 'orgs/dchbx';
    await admin.doc('users/phil').set(philUser);
    await admin.doc(orgDoc).set({ content: 'before' });

    await firebase.assertSucceeds(philDb.doc(orgDoc).get());
    await firebase.assertFails(philDb.doc(orgDoc).update({ content: 'after' }));
  });

  it('can read and write to environment docs if admin', async () => {
    const envDoc = 'orgs/dchbx/environments/env-1';
    await admin.doc('users/lem').set(lemUser);
    await admin.doc(envDoc).set({ content: 'before' });

    await firebase.assertSucceeds(lemDb.doc(envDoc).get());
    await firebase.assertSucceeds(
      lemDb.doc(envDoc).update({ content: 'after' }),
    );
  });

  it('can read but not write to environment docs if member of org', async () => {
    const envDoc = 'orgs/dchbx/environments/env-1';
    await admin.doc('users/phil').set(philUser);
    await admin.doc(envDoc).set({ content: 'before' });

    await firebase.assertSucceeds(philDb.doc(envDoc).get());
    await firebase.assertFails(philDb.doc(envDoc).update({ content: 'after' }));
  });

  it('can only read user documents if logged in and match uid', async () => {
    const userDoc = 'users/phil';
    await admin.doc(userDoc).set({ content: 'before' });

    await firebase.assertSucceeds(philDb.doc(userDoc).get());
    await firebase.assertFails(lemDb.doc(userDoc).get());
    await firebase.assertFails(noUserDb.doc(userDoc).get());
  });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});
