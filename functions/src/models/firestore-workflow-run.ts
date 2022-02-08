import { CheckSuiteConclusion } from '../webhook/interfaces';

export interface FSWorkflowRun {
  htmlUrl: string;
  runId: number;
  runStartedAt: string;
  updatedAt: string;
  workflowId: number;
  runtime: number;
  repositoryName: string;
  workflowName: string;
  conclusion: CheckSuiteConclusion | null;
  action: 'requested' | 'completed';
}
