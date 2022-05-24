import * as functions from 'firebase-functions';
import { Octokit, App } from 'octokit';

const repositoryLinks: Record<string, string> = {
  maine: 'cme_k8s',
};

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
  const pat: string = functions.config().gh.pat ?? 'no-pat';

  if (context.auth?.token.email === 'yellr@ideacrew.com') {
    const octokit = new Octokit({ auth: pat });

    const baseConfigYML = await octokit.rest.repos.getContent({
      owner: 'ideacrew',
      repo: repositoryLinks[orgId] || 'cme_k8s',
      path: 'base/config/env-configmap.yaml',
      headers: { accept: 'application/vnd.github.v3.raw' },
    });

    functions.logger.info('Response from getContent', baseConfigYML);

    const environmentConfigYML = await octokit.rest.repos.getContent({
      owner: 'ideacrew',
      repo: repositoryLinks[orgId] || 'cme_k8s',
      path: `environments/${envId}/config/env-configmap.yaml`,
      headers: { accept: 'application/vnd.github.v3.raw' },
    });

    functions.logger.info('Response from getContent', environmentConfigYML);

    return [];
  } else {
    return [];
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
