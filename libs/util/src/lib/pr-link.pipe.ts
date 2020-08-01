import { Pipe, PipeTransform } from '@angular/core';

import { BranchInfo } from './models';
import { getPullRequestLink } from './branchVM.util';

@Pipe({
  name: 'prLink',
})
export class PrLinkPipe implements PipeTransform {
  transform(branch: BranchInfo): string {
    return getPullRequestLink(branch);
  }
}
