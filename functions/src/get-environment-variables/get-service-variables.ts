import { https } from 'firebase-functions';

import { EnvironmentVariableDict } from './environment-variable-dict';
import { ServiceIdentifier } from './environment-identifier';
import { getService } from './get-service';

export const getServiceVariables = async (
  { orgId, envId, serviceId }: ServiceIdentifier,
  context: https.CallableContext,
): Promise<EnvironmentVariableDict> => {
  if (context.auth?.token.email === 'yellr@ideacrew.com') {
    const serviceVariables = await getService({ orgId, envId, serviceId });
    return serviceVariables;
  } else {
    return {} as EnvironmentVariableDict;
  }
};
