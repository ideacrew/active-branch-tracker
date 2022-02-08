/* eslint-disable unicorn/no-null */
/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FSWorkflowRun, FSWorkflow, FSFastestRun } from '../models';
import { sendSlackMessageToChannel } from '../slack-notifications';
import { msToMinutesAndSeconds } from '../util';

admin.initializeApp();

export const checkWorkflowRuntime = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext,
): Promise<null> => {
  const { workflowId, runId } = context.params;

  const workflowRunDocument = snapshot.data() as FSWorkflowRun;

  const { runtime, repositoryName, workflowName } = workflowRunDocument;

  const workflowReference = admin
    .firestore()
    .collection('workflows')
    .doc(workflowId);
  const workflowDocumentSnap = await workflowReference.get();
  const workflowDocument = workflowDocumentSnap.data() as FSWorkflow;

  if (workflowDocument.fastestRun === undefined) {
    const newFastestRun: FSFastestRun = {
      runtime,
      runId: Number.parseInt(runId, 10),
    };

    await workflowReference.update({ fastestRun: newFastestRun });
    return null;
  }

  if (workflowDocument.fastestRun.runtime > runtime) {
    const newFastestRun: FSFastestRun = {
      runtime,
      runId: Number.parseInt(runId, 10),
    };

    await workflowReference.update({ fastestRun: newFastestRun });
    await sendSlackMessageToChannel({
      text: `New fastest runtime for ${workflowName} in ${repositoryName}: ${msToMinutesAndSeconds(
        runtime,
      )}`,
      channel: 'yellr-announcements',
    });

    return null;
  }

  return null;
};
