import { BranchInfo } from '@idc/util';

interface BranchQuery {
  branches: BranchInfo[];
  rawQuery: string;
}

export const searchBranches = ({
  branches,
  rawQuery,
}: BranchQuery): BranchInfo[] => {
  if (rawQuery === undefined || rawQuery === '') {
    return branches;
  } else {
    const query = rawQuery.trim().toLocaleLowerCase();

    return branches.filter(
      branch => branch.branchName?.search(query) !== -1,
      // branch => branch.organizationName.search(query) !== -1,
      // branch.repositoryName.search(query) !== -1 ||
      // branch.status?.search(query) !== -1,
    );
  }
};
