import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

import { BranchInfo } from './models';

const releaseBranchLifetimeInDays = 14;
const featureBranchLifetimeInDays = 7;

@Pipe({
  name: 'timeLeft',
})
export class TimeLeftPipe implements PipeTransform {
  transform(branch: BranchInfo): number {
    if (branch.created_at === undefined || branch.created_at === null) {
      return 0;
    }
    const now = new Date();
    const branchDate = new Date(branch.created_at);

    const branchDaysOld = differenceInCalendarDays(now, branchDate);

    const timeLeftAsPercentage = isReleaseBranch(branch.branchName)
      ? Math.floor(
          ((releaseBranchLifetimeInDays - branchDaysOld) /
            releaseBranchLifetimeInDays) *
            100,
        )
      : Math.floor(
          ((featureBranchLifetimeInDays - branchDaysOld) /
            featureBranchLifetimeInDays) *
            100,
        );

    return timeLeftAsPercentage > 0 ? timeLeftAsPercentage : 0;
  }
}

const isReleaseBranch = (branchName: string): boolean =>
  branchName.startsWith('release');
