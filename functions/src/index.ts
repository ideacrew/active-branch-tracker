import * as functions from 'firebase-functions';

export const webhook = functions.https.onRequest(async (req, res) => {
  await (await import('./webhook/webhook')).handleWebhook(req, res);
});

export const branchDeployment = functions.https.onRequest(
  async (request, response) => {
    await (
      await import('./branch-deployment/')
    ).handleBranchDeployment(request, response);
  },
);

export const dataRefresh = functions.https.onRequest(
  async (request, response) => {
    await (
      await import('./data-refresh/dataRefresh')
    ).handleDataRefresh(request, response);
  },
);

export const secretWebService = functions.https.onRequest(
  async (request, response) => {
    if (request.query.apiKey === 'abc1234') {
      response.status(200).send('Here is the secret message');
    } else {
      response.status(403).send('You are unauthorized');
    }
  },
);
