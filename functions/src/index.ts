import * as functions from 'firebase-functions';

export const webhook = functions.https.onRequest(async (request, response) => {
  const { handleWebhook } = await import('./webhook/webhook');
  await handleWebhook(request, response);
});

export const branchDeployment = functions.https.onRequest(
  async (request, response) => {
    const { handleBranchDeployment } = await import('./branch-deployment/');
    await handleBranchDeployment(request, response);
  },
);

export const dataRefresh = functions.https.onRequest(
  async (request, response) => {
    const { handleDataRefresh } = await import('./data-refresh');
    await handleDataRefresh(request, response);
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
    const { deleteOldBranchDocuments } = await import(
      './delete-old-branch-docs'
    );
    await deleteOldBranchDocuments(request, response);
  },
);

export const githubStatusWebhook = functions.https.onRequest(
  async (request, response) => {
    const { handleGitHubStatusWebhook } = await import(
      './github-status-webhook'
    );
    await handleGitHubStatusWebhook(request, response);
  },
);

export const api = functions.https.onRequest(async (request, response) => {
  const { app } = await import('./api');

  await app(request, response);
});

export const checkWorkflowRuntime = functions.firestore
  .document('workflows/{workflowId}/runs/{runId}')
  .onCreate(async (snapshot, context) => {
    const { checkWorkflowRuntime } = await import('./check-workflow-runtime');
    await checkWorkflowRuntime(snapshot, context);
  });

export const getEnvironmentVariables = functions.https.onCall(
  async (data, context) => {
    const { getEnvironmentVariables } = await import(
      './get-environment-variables'
    );
    return getEnvironmentVariables(data, context);
  },
);

export const getServiceVariables = functions.https.onCall(
  async (data, context) => {
    const { getServiceVariables } = await import('./get-environment-variables');
    return getServiceVariables(data, context);
  },
);
