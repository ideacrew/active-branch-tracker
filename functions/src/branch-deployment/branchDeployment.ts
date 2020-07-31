import { BranchDeployment } from './branchDeployment.interface';

export async function handleBranchDeployment(deployment: BranchDeployment) {
  console.log({ deployment });
  return Promise.resolve();
}
