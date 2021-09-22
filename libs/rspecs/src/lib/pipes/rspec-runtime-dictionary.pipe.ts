import { Pipe, PipeTransform } from '@angular/core';
import { FileWithRuntimeDictionary, RspecExample } from '../models';
import { rspecRuntimeDictionary } from '../util/rspecReportFileRuntimeDictionary';

@Pipe({
  name: 'rspecRuntimeDictionary',
})
export class RspecRuntimeDictionaryPipe implements PipeTransform {
  transform(examples: RspecExample[]): FileWithRuntimeDictionary {
    return rspecRuntimeDictionary(examples);
  }
}
