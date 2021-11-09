import { Pipe, PipeTransform } from '@angular/core';
import {
  BackgroundElement,
  ScenarioElement,
  calculateBackgroundRuntime,
  calculateScenarioRuntime,
  isBackground,
} from 'cucumber-report-analyzer';

@Pipe({
  name: 'elementRuntime',
})
export class ElementRuntimePipe implements PipeTransform {
  transform(element: ScenarioElement | BackgroundElement): string {
    let runtime: number;

    if (isBackground(element)) {
      runtime = calculateBackgroundRuntime(element);
    } else {
      runtime = calculateScenarioRuntime(element);
    }

    return `${(runtime / 1000000000).toFixed(2)}s`;
  }
}
