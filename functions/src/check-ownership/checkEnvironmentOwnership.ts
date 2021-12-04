import * as functions from 'firebase-functions';

import { BranchDeploymentPayload } from '../branch-deployment';
import { sendSlackMessage } from '../slack-notifications';
import { yellrEnvLink } from '../util';
import { checkOwnership } from './checkOwnership';

export const checkEnvironmentOwnership = async (
  deployment: BranchDeploymentPayload,
): Promise<void> => {
  const { org, env, status, branch } = deployment;
  const ownedEnvironment = await checkOwnership({ org, env });

  if (!ownedEnvironment && status === 'started') {
    const yellrLink = yellrEnvLink({ org, env });
    functions.logger.info(`${org}/${env} is not owned!`);
    await sendSlackMessage(
      `⚠ <!channel> *${branch}* is being deployed to <${yellrLink}|*${org}-${env}*> with _no current owner_! ⚠`,
    );
  }
};
