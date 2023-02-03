import { Pipe, PipeTransform } from '@angular/core';

import { BranchInfo } from './models';

@Pipe({
  name: 'isOld',
})
export class IsOldPipe implements PipeTransform {
  transform(branch: BranchInfo): boolean {
    const today = Date.now();

    const oneDayInMs = 1000 * 60 * 60 * 24;
    const threeDaysInMs = 3 * oneDayInMs;
    const threeDaysAgo = today - threeDaysInMs;

    return branch.defaultBranch ? false : branch.timestamp < threeDaysAgo;
  }
}
