import { getConfigMap } from './get-config';
import { ServiceIdentifier } from './environment-identifier';
import * as functions from 'firebase-functions';

import {
  ConfigMapEnvironmentReference,
  EnvironmentReference,
} from './environment-reference';
import { EnrollServices } from '../models';
import { EnvironmentVariableDict } from './environment-variable-dict';
import { Octokit } from 'octokit';
import * as yaml from 'js-yaml';
const repositoryLinks: Record<string, string> = {
  maine: 'cme_k8s',
  dchbx: 'dchbx_k8s',
};

const extraFolder = ['enroll', 'edidb'] as Partial<EnrollServices>[];
const needsParsing = [
  'medicaid-gateway',
  'crm-gateway',
  'b2b-gateway',
] as Partial<EnrollServices>[];

const pat: string =
  functions.config().gh.pat ?? process.env.GH_PAT ?? 'cme_k8s';

export const getService = async ({
  orgId,
  envId,
  serviceId,
}: ServiceIdentifier): Promise<EnvironmentVariableDict> => {
  const environmentValues = await getConfigMap({ orgId, envId });

  const octokit = new Octokit({ auth: pat });

  // If the service name is like `medicaid-gateway` convert it
  // to `medicaid_gateway` for the folder path
  const serviceFolderName = needsParsing.includes(serviceId)
    ? serviceId.replace('-', '_')
    : serviceId;

  // If the service name is like `enroll` or `edidb` there is an
  // extra folder that the yaml file is nested in
  const path = extraFolder.includes(serviceId)
    ? `base/${serviceFolderName}/web/${serviceId}.yaml`
    : `base/${serviceFolderName}/${serviceId}.yaml`;

  const githubResponse = await octokit.rest.repos.getContent({
    owner: 'ideacrew',
    repo: repositoryLinks[orgId] || 'cme_k8s',
    path,
    headers: { accept: 'application/vnd.github.v3.raw' },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawYaml: string = githubResponse.data as any;

  // Need to loadAll because these yaml files have multiple documents
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deployment] = yaml.loadAll(rawYaml) as any[];

  const environmentReferenceList = deployment.spec.template.spec.containers[0]
    .env as EnvironmentReference[];

  // Filter out references to secret keys
  const filteredVariables = environmentReferenceList.filter(reference => {
    const cfReference = reference as ConfigMapEnvironmentReference;

    return (
      cfReference.valueFrom !== undefined &&
      cfReference.valueFrom.configMapKeyRef !== undefined
    );
  });
  const serviceVariables: EnvironmentVariableDict = {};

  // Loop over the environment variable references in the Service yaml file
  // and pair those with the values that come from the base and env config map
  for (const reference of filteredVariables) {
    const { name } = reference;

    serviceVariables[name] = environmentValues[name] ?? 'undefined';
  }

  return serviceVariables;
};
