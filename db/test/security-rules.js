const firebase = require('@firebase/rules-unit-testing');
const projectId = 'active-branches-report';
const port = require('../../firebase.json').emulators.firestore.port || 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const myId = 'user_abc';
const theirId = 'user_xyz';
const modId = 'user_mod';
const myAuth = { uid: myId, email: 'abc@gmail.com' };
const modAuth = { uid: modId, email: 'mod@gmail.com', isModerator: true };

function getFirestore(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId }).firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId });
});

describe('testing assertions', () => {
  // it('Can read items in the read-only collection', async () => {
  //   const db = getFirestore(null);
  //   const testDoc = db.collection('branches').doc('testDoc');
  //   await firebase.assertSucceeds(testDoc.get());
  // });

  // it('Cannot write to items in the read-only collection', async () => {
  //   const db = getFirestore(null);
  //   const testDoc = db.collection('branches').doc('testDoc2');
  //   await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  // });

  // it('Can write to a user document with same ID as our user', async () => {
  //   const db = getFirestore(myAuth);
  //   const testDoc = db.collection('users').doc(myId);
  //   await firebase.assertSucceeds(testDoc.set({ foo: 'bar' }));
  // });

  // it('Cannot write to a user document with different ID as our user', async () => {
  //   const db = getFirestore(myAuth);
  //   const testDoc = db.collection('users').doc(theirId);
  //   await firebase.assertFails(testDoc.set({ foo: 'bar' }));
  // });

  // it('Can read posts marked public', async () => {
  //   const db = getFirestore(null);
  //   const testQuery = db
  //     .collection('posts')
  //     .where('visibility', '==', 'public');
  //   await firebase.assertSucceeds(testQuery.get());
  // });

  // it('Can query personal posts', async () => {
  //   const db = getFirestore(myAuth);
  //   const testQuery = db.collection('posts').where('authorId', '==', myId);
  //   await firebase.assertSucceeds(testQuery.get());
  // });

  // it('Cannot query all posts', async () => {
  //   const db = getFirestore(myAuth);
  //   const testQuery = db.collection('posts');
  //   await firebase.assertFails(testQuery.get());
  // });

  // it('Can read a single public post', async () => {
  //   const admin = getAdminFirestore();
  //   const postId = 'public_post';
  //   const setupDoc = admin.collection('posts').doc(postId);
  //   await setupDoc.set({ authorId: theirId, visibility: 'public' });

  //   const db = getFirestore(null);
  //   const testRead = db.collection('posts').doc(postId);
  //   await firebase.assertSucceeds(testRead.get());
  // });

  // it('Can read a private post belonging to the user', async () => {
  //   const admin = getAdminFirestore();
  //   const postId = 'public_post';
  //   const setupDoc = admin.collection('posts').doc(postId);
  //   await setupDoc.set({ authorId: myId, visibility: 'public' });

  //   const db = getFirestore(myAuth);
  //   const testRead = db.collection('posts').doc(postId);
  //   await firebase.assertSucceeds(testRead.get());
  // });

  // it('Cannot read a private post belonging to another user', async () => {
  //   const admin = getAdminFirestore();
  //   const postId = 'public_post';
  //   const setupDoc = admin.collection('posts').doc(postId);
  //   await setupDoc.set({ authorId: theirId, visibility: 'private' });

  //   const db = getFirestore(myAuth);
  //   const testRead = db.collection('posts').doc(postId);
  //   await firebase.assertFails(testRead.get());
  // });

  // it('Allows a user to edit their own post', async () => {
  //   const postId = 'post_123';
  //   const admin = getAdminFirestore();
  //   await admin
  //     .collection('posts')
  //     .doc(postId)
  //     .set({ content: 'before', authorId: myId });

  //   const db = getFirestore(myAuth);
  //   const testDoc = db.collection('posts').doc(postId);
  //   await firebase.assertSucceeds(testDoc.update({ content: 'after' }));
  // });

  // it(`Does not allow a user to edit someone else's post`, async () => {
  //   const postId = 'post_123';
  //   const admin = getAdminFirestore();
  //   await admin
  //     .collection('posts')
  //     .doc(postId)
  //     .set({ content: 'before', authorId: theirId });

  //   const db = getFirestore(myAuth);
  //   const testDoc = db.collection('posts').doc(postId);
  //   await firebase.assertFails(testDoc.update({ content: 'after' }));
  // });

  // it(`Allows a moderator to edit someone else's post`, async () => {
  //   const postId = 'post_123';
  //   const admin = getAdminFirestore();
  //   await admin
  //     .collection('posts')
  //     .doc(postId)
  //     .set({ content: 'before', authorId: theirId });

  //   const db = getFirestore(modAuth);
  //   const testDoc = db.collection('posts').doc(postId);
  //   await firebase.assertSucceeds(testDoc.update({ content: 'after' }));
  // });

  it(`allows anyone to read all branches`, async () => {
    const branchDoc = 'branches/feature-2.1';
    const db = getFirestore(null);
    const testDoc = db.doc(branchDoc);
    await firebase.assertSucceeds(testDoc.get());
  });

  it(`can only update a branch if logged in`, async () => {
    const branchDoc = 'branches/feature-2.1';
    const admin = getAdminFirestore();
    await admin.doc(branchDoc).set({ content: 'before' });

    const db = getFirestore(myAuth);
    const testDoc = db.doc(branchDoc);
    await firebase.assertSucceeds(testDoc.update({ content: 'after' }));
  });

  it(`cannot update an environment if not logged in`, async () => {
    const envDoc = 'environments/pvt-2';
    const admin = getAdminFirestore();
    await admin.doc(envDoc).set({ content: 'before' });

    const db = getFirestore(null);
    const testDoc = db.doc(envDoc);
    await firebase.assertFails(testDoc.update({ content: 'after' }));
  });

  it(`can only update an environment if logged in`, async () => {
    const envDoc = 'environments/pvt-2';
    const admin = getAdminFirestore();
    await admin.doc(envDoc).set({ content: 'before' });

    const db = getFirestore(myAuth);
    const testDoc = db.doc(envDoc);
    await firebase.assertSucceeds(testDoc.update({ content: 'after' }));
  });
});

after(async () => {
  await firebase.clearFirestoreData({ projectId });
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});
