import { Pipe, PipeTransform } from '@angular/core';
import { BranchInfoVM } from '@idc/util';

@Pipe({
  name: 'isOld',
})
export class IsOldPipe implements PipeTransform {
  transform(branch: BranchInfoVM, ...args: unknown[]): boolean {
    const today = new Date().getTime();

    const oneDayInMs = 1000 * 60 * 60 * 24;
    const tenDaysInMs = 10 * oneDayInMs;
    const tenDaysAgo = today - tenDaysInMs;

    if (branch.defaultBranch) {
      return false;
    } else if (branch.tracked) {
      return branch.timestamp < tenDaysAgo;
    }

    return false;
  }
}
