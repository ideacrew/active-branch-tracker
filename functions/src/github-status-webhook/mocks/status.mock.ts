import { GitHubStatusPayload } from '../models';

/* eslint-disable unicorn/no-null */
export const yetAnotherPayload: GitHubStatusPayload = {
  incident: {
    status: 'investigating',
    name: 'Incident with Pull Requests',
  },
};

export const finalPayload: GitHubStatusPayload = {
  incident: {
    status: 'resolved',
    name: 'Incident with Pull Requests',
  },
};
