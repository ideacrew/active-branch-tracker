export interface FSWorkflow {
  name: string;
  fastestRun: FSFastestRun;
}

export interface FSFastestRun {
  runtime: number;
  runId: number;
}
