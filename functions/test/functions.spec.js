const { expect } = require('chai');
const admin = require('firebase-admin');
const test = require('firebase-functions-test')({
  projectId: process.env.GCLOUD_PROJECT,
});
const myFunctions = require('../lib/index');

describe('Unit tests', () => {
  after(() => {
    test.cleanup();
  });

  it('tests a firestore write', async () => {
    const wrapped = test.wrap(myFunctions.createUserRecord);
    const user = test.auth.makeUserRecord({
      uid: 'abc1234',
      email: 'markgoho@gmail.com',
      displayName: 'Mark Goho',
      photoURL: 'https://example.com',
    });

    await wrapped(user);

    const snap = await admin.firestore().doc('users/abc1234').get();
    expect(snap.data()).to.eql({
      admin: false,
      email: 'markgoho@gmail.com',
      displayName: 'Mark Goho',
      photoUrl: 'https://example.com',
    });
  });
});
