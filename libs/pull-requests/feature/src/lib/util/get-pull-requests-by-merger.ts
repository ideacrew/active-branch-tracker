import { FSPullRequest } from '@idc/pull-requests/data-access';

import { PRByAuthor } from '../models';

export const getPRsByApprover = (mergedPRs: FSPullRequest[]): PRByAuthor[] => {
  const mergers: string[] = mergedPRs.map(pr => pr.mergedBy ?? 'unknown');
  const uniqueMergers: string[] = [...new Set(mergers)];

  const mergedByPRs: PRByAuthor[] = uniqueMergers.map(merger => {
    const authorPRs: FSPullRequest[] = mergedPRs.filter(
      pr => pr.mergedBy === merger,
    );

    return {
      author: merger,
      mergedPRs: authorPRs,
      quantity: authorPRs.length,
    };
  });

  const sorted = mergedByPRs.sort((a, b) =>
    a.mergedPRs.length > b.mergedPRs.length ? -1 : 1,
  );

  return sorted;
};
