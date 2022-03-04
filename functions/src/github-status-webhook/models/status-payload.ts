/* eslint-disable unicorn/no-null */
/* eslint-disable camelcase */
export interface GitHubStatusPayload {
  incident: GitHubStatusIncident;
}

interface GitHubStatusIncident {
  name: string; // 'Incident with GitHub Actions'
  status: string; // enum? 'resolved'
}
