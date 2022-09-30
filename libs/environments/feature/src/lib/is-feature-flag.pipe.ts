import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFeatureFlag',
})
export class IsFeatureFlagPipe implements PipeTransform {
  transform(
    { value }: { value: string },
    typeToShow: 'true' | 'false',
  ): boolean {
    return value === typeToShow;
  }
}
