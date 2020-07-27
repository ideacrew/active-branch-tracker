import { Pipe, PipeTransform } from '@angular/core';
import { BranchInfoVM } from '@idc/util';

@Pipe({
  name: 'branchLink',
})
export class BranchLinkPipe implements PipeTransform {
  transform(branch: BranchInfoVM): string {
    const query = encodeURI(branch.branchName);

    return `//github.com/${branch.organizationName}/${branch.repositoryName}/branches/all?query=${query}`;
  }
}
