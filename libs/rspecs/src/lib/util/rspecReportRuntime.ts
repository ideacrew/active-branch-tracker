import { RspecExample } from '../models';

export const rspecReportRuntime = (examples: RspecExample[]): number =>
  examples.reduce(
    (total: number, example: RspecExample) => total + example.run_time,
    0,
  );
