import { Pipe, PipeTransform } from '@angular/core';
import { formatRelative } from 'date-fns';

@Pipe({
  name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
  transform(d: Date, ...args: unknown[]): string {
    if (d instanceof Date) {
      return formatRelative(d, new Date());
    } else {
      throw 'The Relative Date pipe needs a Date object';
    }
  }
}
