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

// const a = {
//   context: {
//     auth: {
//       uid: 'tpRfOA1gwJOE1oICxOr9qiCm0if1',
//       token: {
//         iat: 1653327880,
//         uid: 'tpRfOA1gwJOE1oICxOr9qiCm0if1',
//         firebase: {
//           identities: { email: ['yellr@ideacrew.com'] },
//           sign_in_provider: 'password',
//         },
//         aud: 'active-branches-report',
//         exp: 1653331480,
//         email_verified: false,
//         email: 'yellr@ideacrew.com',
//         iss: 'https://securetoken.google.com/active-branches-report',
//         auth_time: 1646666235,
//         sub: 'tpRfOA1gwJOE1oICxOr9qiCm0if1',
//         user_id: 'tpRfOA1gwJOE1oICxOr9qiCm0if1',
//       },
//     },
//   },
// };
