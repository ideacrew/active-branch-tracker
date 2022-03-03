export interface ServiceDeploymentPayload {
  image: string;
  env: string;
  org: string; // maine, dchbx
  status: 'started' | 'completed';
  user_name: string;
}
