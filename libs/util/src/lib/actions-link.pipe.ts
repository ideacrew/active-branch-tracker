import { Pipe, PipeTransform } from '@angular/core';

import { getActionsLink } from './branch-vm.util';
import { BranchInfo } from './models';

@Pipe({
  name: 'actionsLink',
})
export class ActionsLinkPipe implements PipeTransform {
  transform(branch: BranchInfo): string {
    return getActionsLink(branch);
  }
}
