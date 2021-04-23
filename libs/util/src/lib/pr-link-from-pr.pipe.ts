import { Pipe, PipeTransform } from '@angular/core';

import { PullRequest } from '@idc/pull-requests/data-access';

import { getPullRequestLinkFromPR } from './branchVM.util';

// replace with prLink pipe
@Pipe({
  name: 'prLinkFromPr',
})
export class PrLinkPipeFromPR implements PipeTransform {
  transform(pr: PullRequest): string {
    return getPullRequestLinkFromPR(pr);
  }
}
