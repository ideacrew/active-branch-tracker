import { RspecExample } from '../models';

export const rspecReportRuntime = (examples: RspecExample[]): number => {
  return examples.reduce((total: number, example: RspecExample) => {
    return total + example.run_time;
  }, 0);
};
