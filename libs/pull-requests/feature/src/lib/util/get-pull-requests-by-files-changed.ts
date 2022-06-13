import { FSPullRequest } from '@idc/pull-requests/data-access';

import { PRByFilesChanged } from '../models';

export const getPRsByFilesChanged = (
  mergedPRs: FSPullRequest[],
): PRByFilesChanged[] => {
  const prsWithStats = mergedPRs.filter(
    pr => pr.stats !== undefined && pr.stats.changed_files > 0,
  );

  const filesChanged: number[] = prsWithStats.map(
    pr => pr.stats?.changed_files ?? 0,
  );
  const uniqueFilesChanged: number[] = [...new Set(filesChanged)];

  const changedFilesPRs: PRByFilesChanged[] = uniqueFilesChanged.map(
    changedFiles => {
      const matchingChangedFiles: FSPullRequest[] = mergedPRs.filter(
        pr => pr.stats?.changed_files === changedFiles,
      );

      return {
        filesChanged: changedFiles,
        mergedPRs: matchingChangedFiles,
        quantity: matchingChangedFiles.length,
      };
    },
  );

  const sorted = changedFilesPRs.sort((a, b) =>
    a.filesChanged > b.filesChanged ? 1 : -1,
  );

  return sorted;
};
