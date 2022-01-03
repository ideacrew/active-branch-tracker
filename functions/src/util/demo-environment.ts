export const demoEnvironment = (): boolean => {
  return process.env.GCLOUD_PROJECT === 'demo-project';
};
