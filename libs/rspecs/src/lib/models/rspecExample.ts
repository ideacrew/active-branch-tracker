/* eslint-disable @typescript-eslint/naming-convention */
export interface RspecReport {
  version: string;
  examples: RspecExample[];
  summary: RspecSummary;
  summary_line: string;
}

export interface RspecExample {
  id: string;
  description: string;
  full_description: string;
  status: 'pending' | 'passed';
  file_path: string;
  line_number: number;
  run_time: number;
  pending_message: string | null;
}

export interface RspecSummary {
  duration: number;
  example_count: number;
  failure_count: number;
  pending_count: number;
  errors_outside_of_examples_count: number;
}
