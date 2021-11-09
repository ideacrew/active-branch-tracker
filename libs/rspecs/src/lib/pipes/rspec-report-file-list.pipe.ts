import { Pipe, PipeTransform } from '@angular/core';
import { RspecExample } from 'rspec-report-analyzer';

import { FileWithRuntime } from '../models';
import { createFilesWithRuntime } from '../util/rspecRuntimeFileList';

@Pipe({
  name: 'rspecReportFileList',
})
export class RspecReportFileListPipe implements PipeTransform {
  transform(examples: RspecExample[]): FileWithRuntime[] {
    return createFilesWithRuntime(examples);
  }
}
