import { FSPullRequest } from '@idc/pull-requests/data-access';

import { PRByRepository } from '../models';
import { parseUrlString } from './parse-url-string';

export const getPRsByRepository = (
  mergedPRs: FSPullRequest[],
): PRByRepository[] => {
  const repositories: string[] = mergedPRs.map(pr => {
    const { org, repository } = parseUrlString(pr.url);

    return `${org}-${repository}`;
  });

  const uniqueRepos: string[] = [...new Set(repositories)];

  const repositoryPRs = uniqueRepos.map(repository => {
    console.log('Finding PRs against', repository);

    const repoPRs: FSPullRequest[] = mergedPRs.filter(pr => {
      const { org, repository: prRepo } = parseUrlString(pr.url);

      return `${org}-${prRepo}` === repository;
    });

    return {
      repository,
      mergedPRs: repoPRs,
      quantity: repoPRs.length,
    };
  });

  const sorted = repositoryPRs.sort((a, b) => {
    return a.mergedPRs.length > b.mergedPRs.length ? -1 : 1;
  });

  return sorted;
};
