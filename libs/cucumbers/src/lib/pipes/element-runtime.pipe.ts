import { Pipe, PipeTransform } from '@angular/core';
import { BackgroundElement, ScenarioElement } from '../models';
import { calculateBackgroundRuntime } from '../util/calculateBackgroundRuntime';
import { calculateScenarioRuntime } from '../util/calculateScenarioRuntime';
import { isBackground, isScenario } from '../util/elementType';

@Pipe({
  name: 'elementRuntime',
})
export class ElementRuntimePipe implements PipeTransform {
  transform(
    element: ScenarioElement | BackgroundElement,
    conversion: string,
  ): number {
    let runtime: number;

    if (isBackground(element)) {
      runtime = calculateBackgroundRuntime(element);
    } else {
      runtime = calculateScenarioRuntime(element);
    }

    return runtime / 1000000000;
  }
}
