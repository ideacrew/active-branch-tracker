import { Pipe, PipeTransform } from '@angular/core';

import { BranchInfo } from '@idc/branches/data-access';

import { getCommitLink } from './branchVM.util';

@Pipe({
  name: 'commitLink',
})
export class CommitLinkPipe implements PipeTransform {
  transform(branch: BranchInfo): string {
    return getCommitLink(branch);
  }
}
