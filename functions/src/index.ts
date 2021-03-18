import * as functions from 'firebase-functions';

export const webhook = functions.https.onRequest(async (req, res) => {
  await (await import('./webhook/webhook')).handleWebhook(req, res);
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
