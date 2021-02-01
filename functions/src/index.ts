import * as functions from 'firebase-functions';

export const webhook = functions.https.onRequest(async (req, res) => {
  await (await import('./webhook/webhook')).handleWebhook(req, res);
});

// Run every Friday at 3:15pm Eastern Time
export const oldBranchesNotification = functions.pubsub
  .schedule('45 9 * * 1')
  .timeZone('America/New_York')
  .onRun(async context => {
    await (await import('./staleBranches')).staleBranches(context);
  });

export const simpleHttp = functions.https.onRequest((request, response) => {
  console.log('Simple Http Functions running');
  response.send(`text: ${request.query.text}`);
});

export const branchDeployment = functions.https.onRequest(
  async (request, response) => {
    await (await import('./branch-deployment/')).handleBranchDeployment(
      request,
      response,
    );
  },
);

export const watchEnvironments = functions.firestore
  .document('environments/{environmentId}')
  .onUpdate(async (change, context) => {
    await (
      await import('./deployment-environment/environmentUpdate')
    ).handleEnvironmentUpdate(change, context);
  });
