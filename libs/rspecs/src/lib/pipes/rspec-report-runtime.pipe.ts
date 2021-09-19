import { Pipe, PipeTransform } from '@angular/core';
import { RspecExample } from '../models';
import { rspecReportRuntime } from '../util/rspecReportRuntime';

@Pipe({
  name: 'rspecReportRuntime',
})
export class RspecReportRuntimePipe implements PipeTransform {
  transform(examples: RspecExample[]): number {
    return rspecReportRuntime(examples);
  }
}
