import { GitHubStatusPayload } from './models';

export const isIncident = (
  payload: unknown,
): payload is GitHubStatusPayload => {
  return (payload as GitHubStatusPayload).incident !== undefined;
};
