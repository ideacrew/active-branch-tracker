export interface FSWorkflow {
  name: string;
  fastestRun: {
    runtime: number;
    runId: string;
  };
}
