import { BranchInfo } from '../models';
import { BranchReference, getBranchReference } from './branch-reference';

export const isDefaultBranch = async ({
  organizationName,
  repositoryName,
  branchName,
}: BranchReference): Promise<boolean> => {
  const branchReference = getBranchReference({
    organizationName,
    repositoryName,
    branchName,
  });

  const snapshot = await branchReference.get();

  const document = snapshot.data() as BranchInfo;

  return snapshot.exists && document !== undefined
    ? document.defaultBranch
    : false;
};
