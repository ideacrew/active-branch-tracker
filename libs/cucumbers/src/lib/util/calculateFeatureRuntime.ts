import { BackgroundElement, CucumberFeature, ScenarioElement } from '../models';
import { calculateBackgroundRuntime } from './calculateBackgroundRuntime';
import { calculateScenarioRuntime } from './calculateScenarioRuntime';
import { isBackground, isScenario } from './elementType';

export const calculateFeatureRuntime = (feature: CucumberFeature): number => {
  const scenarioElements: ScenarioElement[] =
    feature.elements.filter(isScenario);

  const backgroundElements: BackgroundElement[] =
    feature.elements.filter(isBackground);

  const scenarioElementsRuntimes: number[] = scenarioElements.map(
    calculateScenarioRuntime,
  );
  const backgroundElementsRuntimes: number[] = backgroundElements.map(
    calculateBackgroundRuntime,
  );

  const scenariosRuntime = scenarioElementsRuntimes.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const backgroundRuntime = backgroundElementsRuntimes.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return scenariosRuntime + backgroundRuntime;
};
