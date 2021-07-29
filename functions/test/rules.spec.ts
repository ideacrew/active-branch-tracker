import * as fs from 'fs';
import * as path from 'path';
import * as firebase from '@firebase/rules-unit-testing';
import { before, after } from 'mocha';
const DEMO_FIREBASE_PROJECT_ID = 'demo-project';
const port = require('../../firebase.json').emulators.firestore.port || 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${DEMO_FIREBASE_PROJECT_ID}:ruleCoverage.html`;

const testUser1 = {
  uid: 'test-user',
  email: 'test-user@example.com',
  orgs: ['org1', 'org2'],
  role: 'external',
};

const ideaCrewUser = {
  uid: 'ideacrew',
  email: 'user@ideacrew.com',
  orgs: ['ideacrew'],
  role: 'admin',
};

const getFirestore = ({ uid, email }) =>
  firebase
    .initializeTestApp({
      projectId: DEMO_FIREBASE_PROJECT_ID,
      auth: { uid, email },
    })
    .firestore();

const admin = firebase
  .initializeAdminApp({
    projectId: DEMO_FIREBASE_PROJECT_ID,
  })
  .firestore();

const addUser = user => admin.doc(`users/${user.uid}`).set(user);

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
  const testUserDb = getFirestore(testUser1);
  const ideaCrewDb = getFirestore(ideaCrewUser);
  const testUserOrg = testUser1.orgs[0];

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId: DEMO_FIREBASE_PROJECT_ID });
    await addUser(testUser1);
    await addUser(ideaCrewUser);
  });

  it(`should only allow admins to read and update branches`, async () => {
    const branchDoc = 'branches/branch1';
    await admin.doc(branchDoc).set({ content: 'before' });

    // Non-admin User
    await firebase.assertFails(testUserDb.doc(branchDoc).get());
    await firebase.assertFails(
      testUserDb.doc(branchDoc).update({ content: 'after' }),
    );

    // Admin user
    await firebase.assertSucceeds(ideaCrewDb.doc(branchDoc).get());

    await firebase.assertSucceeds(
      ideaCrewDb.doc(branchDoc).update({ content: 'after' }),
    );
  });

  it(`should allow members of org or admins to read org doc`, async () => {
    const orgDoc = `orgs/${testUserOrg}`;
    await admin.doc(orgDoc).set({ content: 'before' });

    const orgDocData = (await ideaCrewDb.doc(orgDoc).get()).data();
    console.log({ orgDocData });

    await firebase.assertSucceeds(ideaCrewDb.doc(orgDoc).get());
    await firebase.assertSucceeds(
      ideaCrewDb.doc(orgDoc).update({ content: 'after' }),
    );
  });

  it(`should only allow admins to write an org doc`, async () => {
    const orgDoc = `orgs/${testUserOrg}`;
    await admin.doc(orgDoc).set({ content: 'before' });

    await firebase.assertFails(
      testUserDb.doc(orgDoc).update({ content: 'after' }),
    );
    await firebase.assertSucceeds(
      ideaCrewDb.doc(orgDoc).update({ content: 'after' }),
    );
  });

  it('can read and write to environment docs if admin', async () => {
    const envDoc = `orgs/${testUserOrg}/environments/env-1`;
    await admin.doc(envDoc).set({ content: 'before' });

    await firebase.assertSucceeds(ideaCrewDb.doc(envDoc).get());
    await firebase.assertSucceeds(
      ideaCrewDb.doc(envDoc).update({ content: 'after' }),
    );
  });

  it('should allow read but not write to environment docs if member of org', async () => {
    const envDoc = `orgs/${testUserOrg}/environments/env-1`;
    await admin.doc(envDoc).set({ content: 'before' });

    await firebase.assertSucceeds(testUserDb.doc(envDoc).get());
    await firebase.assertFails(
      testUserDb.doc(envDoc).update({ content: 'after' }),
    );
  });

  it('can read environment services if member of org', async () => {
    const serviceDoc = `orgs/${testUserOrg}/environments/env1/services/service1`;
    await admin.doc(serviceDoc).set({ content: 'before' });

    await firebase.assertSucceeds(testUserDb.doc(serviceDoc).get());
    await firebase.assertSucceeds(ideaCrewDb.doc(serviceDoc).get());
    await firebase.assertFails(
      testUserDb.doc(serviceDoc).update({ content: 'after' }),
    );
  });

  it('can only read user documents if logged in and match uid', async () => {
    const testUserDoc = `users/${testUser1.uid}`;

    await firebase.assertSucceeds(testUserDb.doc(testUserDoc).get());
    await firebase.assertFails(ideaCrewDb.doc(testUserDoc).get());
  });

  it('can only read pull requests if admin', async () => {
    const prDoc = 'pullRequests/pr1';

    await firebase.assertFails(testUserDb.doc(prDoc).get());
    await firebase.assertSucceeds(ideaCrewDb.doc(prDoc).get());
  });
});

after(async () => {
  await firebase.clearFirestoreData({ projectId: DEMO_FIREBASE_PROJECT_ID });
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});
