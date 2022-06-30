import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFeatureFlag',
})
export class IsFeatureFlagPipe implements PipeTransform {
  transform(value: KeyValue<string, string | number | boolean>): boolean {
    return value.value === 'true' || value.value === 'false';
  }
}
