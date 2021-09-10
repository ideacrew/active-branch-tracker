import { Pipe, PipeTransform } from '@angular/core';
import { nanoSecondsToSeconds } from '../util/nanosecondsToSeconds';

@Pipe({
  name: 'nanoToSeconds',
})
export class NanosecondsToSecondsPipe implements PipeTransform {
  // Convert nanoseconds to seconds
  transform(nanoseconds: number | undefined): string {
    return nanoseconds ? nanoSecondsToSeconds(nanoseconds) : '0';
  }
}
