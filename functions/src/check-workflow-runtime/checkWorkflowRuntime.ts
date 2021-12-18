/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FSWorkflowRun, FSWorkflow } from '../models';
import { sendSlackMessageToChannel } from '../slack-notifications';
import { msToMinutesAndSeconds } from '../util';

admin.initializeApp();

export const checkWorkflowRuntime = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext,
): Promise<null> => {
  const { workflowId, runId } = context.params;

  console.log({ workflowId, runId });

  const workflowRunDoc = snapshot.data() as FSWorkflowRun;

  const { runtime, repositoryName, workflowName } = workflowRunDoc;

  const workflowRef = admin.firestore().collection('workflows').doc(workflowId);
  const workflowDocSnap = await workflowRef.get();
  const workflowDoc = workflowDocSnap.data() as FSWorkflow;

  if (workflowDoc.fastestRun === undefined) {
    const newFastestRun = {
      runtime,
      runId,
    };

    await workflowRef.update({ fastestRun: newFastestRun });
    return null;
  }

  if (workflowDoc.fastestRun.runtime > runtime) {
    // New fastest runtime
    console.log('New fastest run, setting it now');

    const newFastestRun = {
      runtime,
      runId,
    };

    await workflowRef.update({ fastestRun: newFastestRun });
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
