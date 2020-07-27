import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchLink',
})
export class BranchLinkPipe implements PipeTransform {
  transform(value: string): string {
    return encodeURI(value);
  }
}
