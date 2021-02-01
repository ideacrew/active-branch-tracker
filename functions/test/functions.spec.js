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

  it.skip('tests a new deployment', async () => {
    const payload = `{"branch": "epic-37695", "env": "pvt-2", "app": "enroll", "user_name": "kvootla", "commit_sha": "4de7a43", "org": "dchbx", "repo": "enroll" }`;
    const req = { body: { payload } };

    const sendPromise = new Promise(resolve => {
      // A fake response object, with a stubbed send() function which asserts that it is called
      // with the right result
      const res = {
        send: text => {
          resolve(text);
        },
      };

      // Invoke function with our fake request and response objects.
      myFunctions.branchDeployment(req, res);
    });

    // Wait for the promise to be resolved and then check the sent text
    const responsePayload = await sendPromise;
    expect(responsePayload).to.deep.eq({
      branch: 'epic-37695',
      env: 'pvt-2',
      app: 'enroll',
      user_name: 'kvootla',
      commit_sha: '4de7a43',
      org: 'dchbx',
      repo: 'enroll',
    });

    const envSnap = await admin
      .firestore()
      .collection('environments')
      .doc('dchbx-pvt-2')
      .get();
    expect(envSnap.data()).to.eql({
      latestDeployment: {
        branch: 'epic-37695',
        env: 'pvt-2',
        app: 'enroll',
        user_name: 'kvootla',
        commit_sha: '4de7a43',
        org: 'dchbx',
        repo: 'enroll',
      },
    });

    const branchSnap = await admin
      .firestore()
      .collection('branches')
      .doc('dchbx-epic-37695')
      .get();

    expect(branchSnap.data()).to.include({ environment: 'pvt-2' });

    expect;
  }).timeout(5000);

  it('should test updates to environment document', async () => {
    const wrapped = test.wrap(myFunctions.watchEnvironments);

    const beforeSnap = test.firestore.makeDocumentSnapshot(
      {
        latestDeployment: {
          branch: 'branch-one',
          env: 'env-1',
          app: 'app',
          user_name: 'kvootla',
          commit_sha: 'sha1',
          org: 'org-one',
          repo: 'app',
        },
      },
      'environments/org-env1',
    );
    const afterSnap = test.firestore.makeDocumentSnapshot(
      {
        latestDeployment: {
          branch: 'branch-two',
          env: 'env-1',
          app: 'app',
          user_name: 'kvootla',
          commit_sha: 'sha2',
          org: 'org-one',
          repo: 'app',
        },
      },
      'environments/org-env1',
    );

    const change = test.makeChange(beforeSnap, afterSnap);
    await wrapped(change);

    const branchOneSnap = await admin
      .firestore()
      .collection('branches')
      .doc('org-one-branch-one')
      .get();

    expect(branchOneSnap.data()).to.not.haveOwnProperty('environment');
  }).timeout(5000);
});
