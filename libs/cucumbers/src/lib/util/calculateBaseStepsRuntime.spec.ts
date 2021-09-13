import { calculateBaseStepsRuntime } from './calculateBaseStepsRuntime';
import { mockBaseSteps } from '../mocks';

describe('Calculating base steps runtime', () => {
  it('should calculate the runtime of a list of base steps', () => {
    expect(calculateBaseStepsRuntime(mockBaseSteps)).toBe(21101251);
  });
});
