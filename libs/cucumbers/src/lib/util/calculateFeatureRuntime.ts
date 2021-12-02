import { CucumberFeature } from 'cucumber-report-analyzer';

import { createFileWithRuntime } from './createFileWithRuntime';

export const calculateFeatureRuntime = (feature: CucumberFeature): number => {
  const { runtime } = createFileWithRuntime(feature);

  return runtime;
};
