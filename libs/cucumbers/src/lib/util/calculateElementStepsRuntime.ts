import { ElementStep } from '../models';
import { calculateBaseStepsRuntime } from './calculateBaseStepsRuntime';

export const calculateElementStepsRuntime = (
  elementSteps: ElementStep[],
): number => {
  const elementStepsRuntime = elementSteps.reduce((acc, elementStep) => {
    const stepDuration = elementStep.result.duration ?? 0;
    const afterRuntime = calculateBaseStepsRuntime(elementStep.after);

    const totalStepRuntime = stepDuration + afterRuntime;

    return acc + totalStepRuntime;
  }, 0);

  return elementStepsRuntime;
};
