import { Pipe, PipeTransform } from '@angular/core';
import { CucumberFeature } from 'cucumber-report-analyzer';

import { calculateFeatureRuntime } from '../util';

@Pipe({
  name: 'featureRuntime',
})
export class FeatureRuntimePipe implements PipeTransform {
  transform(feature: CucumberFeature): string {
    const nsRuntime = calculateFeatureRuntime(feature);
    const sRuntime = nsRuntime / 1e9;

    return `${sRuntime.toFixed(2)}s`;
  }
}
