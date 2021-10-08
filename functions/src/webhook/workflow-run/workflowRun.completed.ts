import { WorkflowRunPayload } from './models';
import * as functions from 'firebase-functions';

export const handleWorkflowRunEvent = (
  payload: WorkflowRunPayload,
): Promise<void> => {
  functions.logger.info('Workflow run payload', payload);

  return Promise.resolve();
};
