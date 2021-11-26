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

export const serviceDeployment = functions.https.onRequest(
  async (request, response) => {
    await (
      await import('./branch-deployment/')
    ).handleBranchDeploymentV2(request, response);
  },
);

export const dataRefresh = functions.https.onRequest(
  async (request, response) => {
    await (await import('./data-refresh')).handleDataRefresh(request, response);
  },
);

export const dataRefreshV2 = functions.https.onRequest(
  async (request, response) => {
    await (
      await import('./data-refresh')
    ).handleDataRefreshV2(request, response);
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

export const deleteOldBranchDocuments = functions.https.onRequest(
  async (request, response) => {
    await (
      await import('./delete-old-branch-docs')
    ).deleteOldBranchDocs(request, response);
  },
);

export const defaultBranchFailure = functions.firestore
  .document('branches/{docId}')
  .onUpdate(async change => {
    await (
      await import('./default-branch-failure')
    ).defaultBranchFailure(change);
  });

export const defaultBranchSuccess = functions.firestore
  .document('branches/{docId}')
  .onUpdate(async change => {
    await (
      await import('./default-branch-success')
    ).defaultBranchSuccess(change);
  });

export const pingEnvironmentsHttp = functions.https.onRequest(
  async (request, response) => {
    await (
      await import('./ping-environments')
    ).pingEnvironmentsHttp(request, response);
  },
);

export const pingEnvironmentsCallable = functions.https.onCall(
  async (data, context) => {
    return (await import('./ping-environments')).pingEnvironmentsCallable(
      data,
      context,
    );
  },
);

export const githubStatusWebhook = functions.https.onRequest(
  async (req, res) => {
    await (
      await import('./github-status-webhook')
    ).handleGitHubStatusWebhook(req, res);
  },
);

export const api = functions.https.onRequest(async (req, res) => {
  await (await import('./api')).app(req, res);
});
