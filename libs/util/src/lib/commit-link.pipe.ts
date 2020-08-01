import { Pipe, PipeTransform } from '@angular/core';

import { getCommitLink } from './branchVM.util';
import { BranchInfo } from './models';

@Pipe({
  name: 'commitLink',
})
export class CommitLinkPipe implements PipeTransform {
  transform(branch: BranchInfo): string {
    return getCommitLink(branch);
  }
}
