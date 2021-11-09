import { Pipe, PipeTransform } from '@angular/core';
import { RspecExample, rspecReportRuntime } from 'rspec-report-analyzer';

@Pipe({
  name: 'rspecReportRuntime',
})
export class RspecReportRuntimePipe implements PipeTransform {
  transform(examples: RspecExample[]): number {
    return rspecReportRuntime(examples);
  }
}
