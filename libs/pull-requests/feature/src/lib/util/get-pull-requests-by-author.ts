import { FSPullRequest } from '@idc/pull-requests/data-access';

import { PRByAuthor } from '../models';

export const getPRsByAuthor = (mergedPRs: FSPullRequest[]): PRByAuthor[] => {
  const authors: string[] = mergedPRs.map(pr => pr.author);
  const uniqueAuthors: string[] = [...new Set(authors)];

  const authoredPRs: PRByAuthor[] = uniqueAuthors.map(author => {
    const authorPRs: FSPullRequest[] = mergedPRs.filter(
      pr => pr.author === author,
    );

    return {
      author,
      mergedPRs: authorPRs,
      quantity: authorPRs.length,
    };
  });

  const sorted = authoredPRs.sort((a, b) => {
    return a.mergedPRs.length > b.mergedPRs.length ? -1 : 1;
  });

  return sorted;
};
