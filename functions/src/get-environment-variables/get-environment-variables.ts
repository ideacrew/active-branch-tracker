import * as functions from 'firebase-functions';

import { EnvironmentIdentifier } from './environment-identifier';
import { EnvironmentVariableDict } from './environment-variable-dict';
import { getConfigMap } from './get-config';

export const getEnvironmentVariables = async (
  { orgId, envId }: EnvironmentIdentifier,
  context: functions.https.CallableContext,
): Promise<EnvironmentVariableDict> => {
  if (context.auth?.token.email === 'yellr@ideacrew.com') {
    const configMap = await getConfigMap({ orgId, envId });

    return configMap;
  } else {
    return {} as EnvironmentVariableDict;
  }
};
