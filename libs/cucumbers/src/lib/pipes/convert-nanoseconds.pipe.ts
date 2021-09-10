import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertNanoseconds',
})
export class ConvertNanosecondsPipe implements PipeTransform {
  transform(ns: number | undefined, conversion: string = 'ms'): number {
    if (ns === undefined) {
      return 0;
    }

    switch (conversion) {
      case 'ms':
        return ns / 1000000;
      case 's':
        return ns / 1000000000;
      default:
        return ns / 1e9;
    }
  }
}
