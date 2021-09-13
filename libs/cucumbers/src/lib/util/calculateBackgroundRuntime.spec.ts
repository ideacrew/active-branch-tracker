import { backgroundElement } from '../mocks';
import { calculateBackgroundRuntime } from './calculateBackgroundRuntime';

describe('Calculating background step runtime', () => {
  it('should calculate the runtime of a set of element steps', () => {
    expect(calculateBackgroundRuntime(backgroundElement)).toBe(7527435);
  });

  it('should test the runtime of another background element', () => {
    expect(calculateBackgroundRuntime(backgroundElement)).toBe(7527435);
  });
});
