import * as admin from 'firebase-admin';
import { BranchDeployment } from './branchDeployment.interface';
import { getBranchRef, BranchRef } from '../util/branchRef';

export async function handleBranchDeployment(deployment: BranchDeployment) {
  const { branch, env, org, repo } = deployment;

  const branchRef = {
    organizationName: org,
    repositoryName: repo,
    branchName: branch,
  };

  await updateEnvironmentWithBranchInfo(org, deployment);
  await updateBranchWithEnvironmentInfo(branchRef, env);
}

async function updateBranchWithEnvironmentInfo(
  branchRef: BranchRef,
  environmentName: string,
): Promise<void> {
  const fsBranchRef = getBranchRef(branchRef);

  const branch = await fsBranchRef.get();
  if (branch.exists) {
    try {
      await fsBranchRef.set({ environment: environmentName }, { merge: true });
    } catch (e) {
      console.error(e);
    }
  } else {
    return Promise.resolve();
  }
}

async function updateEnvironmentWithBranchInfo(
  organizationName: string,
  deployment: BranchDeployment,
) {
  const environmentRef = admin
    .firestore()
    .collection('environments')
    .doc(`${organizationName}-${deployment.env}`);

  await environmentRef.set({ latestDeployment: deployment }, { merge: true });
}
