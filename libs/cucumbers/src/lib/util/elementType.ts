import { BackgroundElement, ScenarioElement } from '../models';

export const isScenario = (
  element: BackgroundElement | ScenarioElement,
): element is ScenarioElement => (element as ScenarioElement).id !== undefined;

export const isBackground = (
  element: BackgroundElement | ScenarioElement,
): element is BackgroundElement =>
  (element as BackgroundElement).before !== undefined;
