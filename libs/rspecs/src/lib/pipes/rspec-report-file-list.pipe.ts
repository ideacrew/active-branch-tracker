import { Pipe, PipeTransform } from '@angular/core';
import { FileWithRuntime, RspecExample } from '../models';
import { createFilesWithRuntime } from '../util/rspecRuntimeFileList';

@Pipe({
  name: 'rspecReportFileList',
})
export class RspecReportFileListPipe implements PipeTransform {
  transform(examples: RspecExample[]): FileWithRuntime[] {
    return createFilesWithRuntime(examples);
  }
}
