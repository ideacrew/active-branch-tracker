import { OrgName, RepositoryInfo } from '../models';

// String looks like https://github.com/health-connector/enroll/pull/2237
export const parseUrlString = (
  url: string = 'https://github.com/ideacrew/enroll/pulls/1',
): RepositoryInfo => {
  const domainForward = url.slice(8);
  const [, org, repo] = domainForward.split('/');

  return { org: org as OrgName, repository: repo ?? 'no-repo' };
};
