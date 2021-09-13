import { featureWithBackground, noBackgroundFeature } from '../mocks';
import { calculateFeatureRuntime } from './calculateFeatureRuntime';

describe('Calculating feature runtime', () => {
  it('should calculate the runtime of a feature with background', () => {
    expect(calculateFeatureRuntime(featureWithBackground)).toBe(1181227006);
  });

  it('should calculate the runtime of a feature no background', () => {
    expect(calculateFeatureRuntime(noBackgroundFeature)).toBe(209504);
  });
});
