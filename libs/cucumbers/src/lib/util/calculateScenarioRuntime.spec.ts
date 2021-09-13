import { scenarioElement, scenarioElement2, scenarioElement3 } from '../mocks';
import { calculateScenarioRuntime } from './calculateScenarioRuntime';

describe('Calculating scenario step runtime', () => {
  it('should calculate the runtime of a set of element steps', () => {
    expect(calculateScenarioRuntime(scenarioElement)).toBe(90934055);
  });
  it('should calculate the runtime of a set of element steps', () => {
    expect(calculateScenarioRuntime(scenarioElement2)).toBe(1181029403);
  });

  it('should calculate a third runtime', () => {
    expect(calculateScenarioRuntime(scenarioElement3)).toBe(209504);
  });
});
