import { Pipe, PipeTransform } from '@angular/core';

import { BranchInfo } from './models';
import { getFailurePercentage } from './branch-vm.util';

@Pipe({
  name: 'failurePercent',
})
export class FailurePercentPipe implements PipeTransform {
  transform(branch: BranchInfo): number {
    return getFailurePercentage(branch);
  }
}
