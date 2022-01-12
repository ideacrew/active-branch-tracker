/* eslint-disable camelcase */
export interface BranchDeploymentPayload {
  app: string; // name of the service
  branch: string; // derived from image name
  commit_sha: string; // derived from image name
  env: string; // target environment
  org: string; // maine
  repo?: string; // may not be included
  status: 'started' | 'completed';
  user_name: string; // who deployed this image
}
