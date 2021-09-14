import { Pipe, PipeTransform } from '@angular/core';
import { CucumberFeature } from '../models';
import { calculateFeatureRuntime } from '../util/calculateFeatureRuntime';

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
