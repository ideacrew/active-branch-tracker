import * as functions from 'firebase-functions';

export const webhook = functions.https.onRequest(async (req, res) => {
  await (await import('./webhook/webhook')).handleWebhook(req, res);
});

// Run every Friday at 3:15pm Eastern Time
export const oldBranchesNotification = functions.pubsub
  .schedule('45 9 * * 1')
  .timeZone('America/New_York')
  .onRun(async () => {
    await (await import('./staleBranches')).staleBranches();
  });

export const branchDeployment = functions.https.onRequest(
  async (request, response) => {
    await (await import('./branch-deployment/')).handleBranchDeployment(
      request,
      response,
    );
  },
);

export const dataRefresh = functions.https.onRequest(
  async (request, response) => {
    await (await import('./data-refresh/dataRefresh')).handleDataRefresh(
      request,
      response,
    );
  },
);

export const watchEnvironments = functions.firestore
  .document('environments/{environmentId}')
  .onUpdate(async change => {
    await (
      await import('./deployment-environment/environmentUpdate')
    ).handleEnvironmentUpdate(change);
  });
