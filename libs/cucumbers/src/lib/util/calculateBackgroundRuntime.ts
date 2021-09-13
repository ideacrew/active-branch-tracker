import { BackgroundElement } from '../models';
import { calculateBaseStepsRuntime } from './calculateBaseStepsRuntime';
import { calculateElementStepsRuntime } from './calculateElementStepsRuntime';

export const calculateBackgroundRuntime = (
  backgroundElement: BackgroundElement,
): number => {
  const { before, steps } = backgroundElement;

  const beforeRuntime = calculateBaseStepsRuntime(before);
  const elementStepRuntime = steps ? calculateElementStepsRuntime(steps) : 0;

  return beforeRuntime + elementStepRuntime;
};
