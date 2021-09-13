import { ElementStep } from '../models';
import { featureWithBackground } from '../mocks';
import { calculateElementStepsRuntime } from './calculateElementStepsRuntime';

describe('Calculating element steps runtime', () => {
  it('should calculate the runtime of a set of element steps', () => {
    const elementSteps: ElementStep[] =
      featureWithBackground.elements[0].steps!;

    expect(calculateElementStepsRuntime(elementSteps)).toBe(182203);
  });
});
