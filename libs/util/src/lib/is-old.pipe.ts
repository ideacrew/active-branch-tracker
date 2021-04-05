import { Pipe, PipeTransform } from '@angular/core';

import { BranchInfo } from './models';

@Pipe({
  name: 'isOld',
})
export class IsOldPipe implements PipeTransform {
  transform(branch: BranchInfo): boolean {
    const today = new Date().getTime();

    const oneDayInMs = 1000 * 60 * 60 * 24;
    const tenDaysInMs = 10 * oneDayInMs;
    const tenDaysAgo = today - tenDaysInMs;

    return branch.defaultBranch ? false : branch.timestamp < tenDaysAgo;
  }
}
