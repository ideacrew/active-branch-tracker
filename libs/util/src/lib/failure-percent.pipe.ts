import { Pipe, PipeTransform } from '@angular/core';

import { BranchInfo } from '@idc/branches/data-access';

import { getFailurePercentage } from './branchVM.util';

@Pipe({
  name: 'failurePercent',
})
export class FailurePercentPipe implements PipeTransform {
  transform(branch: BranchInfo): number {
    return getFailurePercentage(branch);
  }
}
