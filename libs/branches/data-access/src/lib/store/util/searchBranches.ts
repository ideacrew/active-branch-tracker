import { BranchesEntity } from '../branches.models';

interface BranchQuery {
  branches: BranchesEntity[];
  rawQuery: string;
}

export function searchBranches({
  branches,
  rawQuery,
}: BranchQuery): BranchesEntity[] {
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
}
