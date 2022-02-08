/* eslint-disable camelcase */
export const calculateRuntime = (updated_at: string, run_started_at: string) =>
  new Date(updated_at).getTime() - new Date(run_started_at).getTime();
