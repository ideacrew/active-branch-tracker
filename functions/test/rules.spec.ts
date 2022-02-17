import { readFileSync, createWriteStream } from 'fs';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  doc,
  getDoc,
  setDoc,
  setLogLevel,
  updateDoc,
} from 'firebase/firestore';

import * as http from 'http';
import { FirebaseFirestore } from '@firebase/firestore-types';
import firebase from 'firebase/compat';

const firestorePort =
  require('../../firebase.json').emulators.firestore.port || 8080;

let testEnv: RulesTestEnvironment;
let testUserDb: firebase.firestore.Firestore | FirebaseFirestore;
let ideaCrewDb: firebase.firestore.Firestore | FirebaseFirestore;

interface TestUser {
  uid: string;
  email: string;
  orgs: string[];
  role: 'admin' | 'external';
}

const testUser1: TestUser = {
  uid: 'test-user',
  email: 'test-user@example.com',
  orgs: ['org1', 'org2'],
  role: 'external',
};

const ideaCrewUser: TestUser = {
  uid: 'ideacrew',
  email: 'user@ideacrew.com',
  orgs: ['ideacrew'],
  role: 'admin',
};

const getFirestore = ({ uid, email }: TestUser, env: RulesTestEnvironment) =>
  env.authenticatedContext(uid, { email }).firestore();

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');

  testEnv = await initializeTestEnvironment({
    firestore: {
      rules: readFileSync('../firestore.rules', 'utf8'),
      port: 8080,
      host: 'localhost',
    },
    projectId: 'demo-project',
  });
});

afterAll(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();

  // Write the coverage report to a file
  const coverageFile = 'firestore-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    const { host, port } = testEnv.emulators.firestore;
    const quotedHost = host.includes(':') ? `[${host}]` : host;
    http.get(
      `http://${quotedHost}:${port}/emulator/v1/projects/${testEnv.projectId}:ruleCoverage.html`,
      res => {
        res.pipe(fstream, { end: true });

        res.on('end', resolve);
        res.on('error', reject);
      },
    );
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();

  // Add TestUser1 to the db
  await testEnv.withSecurityRulesDisabled(async context => {
    await setDoc(doc(context.firestore(), `users/${testUser1.uid}`), testUser1);
  });

  // Add IdeaCrewUser to the db
  await testEnv.withSecurityRulesDisabled(async context => {
    await setDoc(
      doc(context.firestore(), `users/${ideaCrewUser.uid}`),
      ideaCrewUser,
    );
  });

  testUserDb = getFirestore(testUser1, testEnv);
  ideaCrewDb = getFirestore(ideaCrewUser, testEnv);
});

describe('testing assertions', () => {
  const testUserOrg = testUser1.orgs[0];

  it(`should only allow admins to read and update branches`, async () => {
    const branchDoc = 'branches/branch1';
    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), branchDoc), { content: 'before' });
    });

    // Non-admin User
    const testUserDocRef = doc(testUserDb, branchDoc);
    await assertFails(getDoc(testUserDocRef));
    await assertFails(setDoc(testUserDocRef, { content: 'after' }));

    // // Admin user
    const adminUserDocRef = doc(ideaCrewDb, branchDoc);
    await assertSucceeds(getDoc(adminUserDocRef));
    await assertSucceeds(setDoc(adminUserDocRef, { content: 'after' }));
  });

  it(`should allow members of org or admins to read org doc`, async () => {
    const orgDoc = `orgs/${testUserOrg}`;

    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), orgDoc), { content: 'before' });
    });

    const docRef = doc(ideaCrewDb, orgDoc);
    await assertSucceeds(getDoc(docRef));
    await assertSucceeds(updateDoc(docRef, { content: 'after' }));
  });

  it(`should only allow admins to write an org doc`, async () => {
    const orgDoc = `orgs/${testUserOrg}`;
    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), orgDoc), { content: 'before' });
    });

    const testUserDocRef = doc(testUserDb, orgDoc);
    await assertFails(updateDoc(testUserDocRef, { content: 'after' }));

    const adminDocRef = doc(ideaCrewDb, orgDoc);
    await assertSucceeds(updateDoc(adminDocRef, { content: 'after' }));
  });

  it('can read and write to environment docs if admin', async () => {
    const envDoc = `orgs/${testUserOrg}/environments/env-1`;
    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), envDoc), { content: 'before' });
    });

    const adminDocRef = doc(ideaCrewDb, envDoc);
    await assertSucceeds(getDoc(adminDocRef));
    await assertSucceeds(updateDoc(adminDocRef, { content: 'after' }));
  });

  it('should allow read but not write to environment docs if member of org', async () => {
    const envDoc = `orgs/${testUserOrg}/environments/env-1`;
    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), envDoc), { content: 'before' });
    });

    const testUserDocRef = doc(testUserDb, envDoc);

    await assertSucceeds(getDoc(testUserDocRef));
    await assertFails(updateDoc(testUserDocRef, { content: 'after' }));
  });

  it('can read environment services if member of org', async () => {
    const serviceDoc = `orgs/${testUserOrg}/environments/env1/services/service1`;
    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), serviceDoc), { content: 'before' });
    });

    const testUserDocRef = doc(testUserDb, serviceDoc);
    await assertSucceeds(getDoc(testUserDocRef));
    await assertFails(updateDoc(testUserDocRef, { content: 'after' }));

    const adminDocRef = doc(ideaCrewDb, serviceDoc);
    await assertSucceeds(getDoc(adminDocRef));
  });

  it('can only read user documents if logged in and match uid', async () => {
    const testUserDoc = `users/${testUser1.uid}`;

    const testUserDocRef = doc(testUserDb, testUserDoc);
    await assertSucceeds(getDoc(testUserDocRef));

    const adminDocRef = doc(ideaCrewDb, testUserDoc);
    await assertFails(getDoc(adminDocRef));
  });
});
