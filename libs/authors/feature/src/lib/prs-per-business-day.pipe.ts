import { Pipe, PipeTransform } from '@angular/core';
import { FSPullRequest } from '@idc/pull-requests/data-access';
import { differenceInBusinessDays } from 'date-fns';

@Pipe({
  name: 'prsPerBusinessDay',
})
export class PrsPerBusinessDayPipe implements PipeTransform {
  transform(prs: FSPullRequest[]): number {
    const prQuantity = prs.length;

    const oldestPrDate = prs[prQuantity - 1].createdAt.toDate();

    const difference = differenceInBusinessDays(new Date(), oldestPrDate);

    return Math.floor(difference / prQuantity);
  }
}
