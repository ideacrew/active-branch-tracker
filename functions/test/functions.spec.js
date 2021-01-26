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

  describe('Setting up an admin', () => {
    it('makes a predefined admin an admin', async () => {
      const wrapped = test.wrap(myFunctions.createUserRecord);
      const user = test.auth.makeUserRecord({
        uid: 'xyz6789',
        email: 'mark.goho@ideacrew.com',
        displayName: 'Mark Goho',
        photoURL: 'https://example.com',
      });

      await wrapped(user);

      const snap = await admin.firestore().doc('users/xyz6789').get();
      expect(snap.data()).to.eql({
        admin: true,
        email: 'mark.goho@ideacrew.com',
        displayName: 'Mark Goho',
        photoURL: 'https://example.com',
      });
    });

    it('does not make a user an admin if not on the list', async () => {
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
        photoURL: 'https://example.com',
      });
    });
  });
});
