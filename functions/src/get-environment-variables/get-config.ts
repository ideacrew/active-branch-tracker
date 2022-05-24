import { Octokit } from 'octokit';
import { ConfigMap } from './configmap';
import * as functions from 'firebase-functions';
import * as yaml from 'js-yaml';

import { EnvironmentIdentifier } from './environment-identifier';
import { EnvironmentVariableDict } from './environment-variable-dict';

const repositoryLinks: Record<string, string> = {
  maine: 'cme_k8s',
};

const pat: string =
  functions.config().gh.pat ?? process.env.GH_PAT ?? 'cme_k8s';

export const getConfigMap = async ({
  orgId,
  envId,
}: EnvironmentIdentifier): Promise<EnvironmentVariableDict> => {
  const octokit = new Octokit({ auth: pat });

  // Get base config
  const baseResponse = await octokit.rest.repos.getContent({
    owner: 'ideacrew',
    repo: repositoryLinks[orgId] || 'cme_k8s',
    path: `base/config/env-configmap.yaml`,
    headers: { accept: 'application/vnd.github.v3.raw' },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseRawFile: string = baseResponse.data as any;

  const baseConfigMap = yaml.load(baseRawFile) as ConfigMap;

  // Get environment config
  const environmentResponse = await octokit.rest.repos.getContent({
    owner: 'ideacrew',
    repo: repositoryLinks[orgId] || 'cme_k8s',
    path: `environments/${envId}/config/env-configmap.yaml`,
    headers: { accept: 'application/vnd.github.v3.raw' },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const environmentRawFile: string = environmentResponse.data as any;

  const environmentConfigMap = yaml.load(environmentRawFile) as ConfigMap;

  return { ...baseConfigMap.data, ...environmentConfigMap.data };
};
