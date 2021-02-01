import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { BranchInfo } from '../webhook/branchInfo';
import { DeploymentEnvironment } from './deploymentEnvironment.interface';

/**
 * Watch for updates to environment documents. If there is a new branch
 * deployed, update the branch document with environment name
 * @param change a change to an Environment document
 * @param _context not used here
 */
export async function handleEnvironmentUpdate(
  change: functions.Change<functions.firestore.QueryDocumentSnapshot>,
  _context: functions.EventContext,
) {
  const {
    org: oldOrg,
    // repo: oldRepo,
    branch: oldBranch,
    commit_sha: oldSha,
  } = (change.before.data() as DeploymentEnvironment).latestDeployment;

  const {
    branch: newBranch,
    commit_sha: newSha,
  } = (change.after.data() as DeploymentEnvironment).latestDeployment;

  // Check to see if the newest deployment is for the same branch
  if (oldBranch === newBranch && oldSha !== newSha) {
    return Promise.resolve();
  }

  // If the branches are different, find the old branch and remove
  // its environment property
  if (oldBranch !== newBranch) {
    const oldBranchRef = admin
      .firestore()
      .collection('branches')
      .doc(`${oldOrg}-${oldBranch}`);

    const oldBranchDoc = await oldBranchRef.get();

    // Only update the branch information if a branch exists
    if (oldBranchDoc.exists) {
      const { environment, ...branchData } = oldBranchDoc.data() as BranchInfo;

      await oldBranchRef.set(branchData);
    }
  } else {
    return Promise.resolve();
  }
}
