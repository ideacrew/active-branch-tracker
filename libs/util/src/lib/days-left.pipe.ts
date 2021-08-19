import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

import { BranchInfo } from './models';

const releaseBranchLifetimeInDays = 14;
const featureBranchLifetimeInDays = 7;

@Pipe({
  name: 'daysLeft',
})
export class DaysLeftPipe implements PipeTransform {
  transform(branch: BranchInfo): number {
    if (branch.created_at === undefined || branch.created_at === null) {
      return 0;
    }
    const now = new Date();
    const branchDate = new Date(branch.created_at);

    const branchDaysOld = differenceInCalendarDays(now, branchDate);

    const timeLeftInDays = isReleaseBranch(branch.branchName)
      ? releaseBranchLifetimeInDays - branchDaysOld
      : featureBranchLifetimeInDays - branchDaysOld;
    return timeLeftInDays > 0 ? timeLeftInDays : 0;
  }
}

const isReleaseBranch = (branchName: string): boolean =>
  branchName.startsWith('release');
