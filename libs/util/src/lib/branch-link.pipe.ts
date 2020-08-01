import { Pipe, PipeTransform } from '@angular/core';
import { BranchInfo } from './models';

@Pipe({
  name: 'branchLink',
})
export class BranchLinkPipe implements PipeTransform {
  transform(branch: BranchInfo): string {
    const query = encodeURI(branch.branchName);

    return `//github.com/${branch.organizationName}/${branch.repositoryName}/branches/all?query=${query}`;
  }
}
