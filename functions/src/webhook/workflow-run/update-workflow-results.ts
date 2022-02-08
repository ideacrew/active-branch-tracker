import { FSWorkflowRun } from '../../models';

export const updateWorkflowResults = (
  existingWorkflowResults: FSWorkflowRun[],
  newWorkflowRun: FSWorkflowRun,
): FSWorkflowRun[] => {
  // Is new workflow run already in the list?
  const workflowRunExists = existingWorkflowResults.some(
    result => result.workflowId === newWorkflowRun.workflowId,
  );

  return workflowRunExists === false
    ? [...existingWorkflowResults, newWorkflowRun]
    : existingWorkflowResults.map(workflowRun => {
        return workflowRun.workflowId === newWorkflowRun.workflowId
          ? newWorkflowRun
          : workflowRun;
      });
};
