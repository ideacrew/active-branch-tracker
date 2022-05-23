import * as functions from 'firebase-functions';

interface EnvironmentIdentifier {
  orgId: string;
  envId: string;
}

interface EnvironmentVariable {
  name: string;
  value: string;
}

export const getEnvironmentVariables = async (
  { orgId, envId }: EnvironmentIdentifier,
  context: functions.https.CallableContext,
): Promise<EnvironmentVariable[]> => {
  functions.logger.info('Callable function called', { orgId, envId, context });

  return [{ name: 'foo', value: 'bar' }];
};
