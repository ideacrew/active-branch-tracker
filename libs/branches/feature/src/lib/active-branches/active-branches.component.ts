import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BranchInfo, CheckSuiteConclusion } from '@idc/util';
import {
  BranchesFacade,
  BranchesEntity,
  BranchesActions,
} from '@idc/branches/data-access';
import { DisplayConfigService, DisplayType } from '@idc/display-config';

@Component({
  selector: 'idc-active-branches',
  templateUrl: './active-branches.component.html',
  styleUrls: ['./active-branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveBranchesComponent {
  CheckSuiteConclusion = CheckSuiteConclusion;
  DisplayType = DisplayType;

  // time$: Observable<Date> = timer(0, 60000).pipe(
  //   map(tick => new Date()),
  //   shareReplay(1)
  // );

  constructor(
    public branchesFacade: BranchesFacade,
    public configService: DisplayConfigService,
  ) {}

  trackByBranchName(index: number, branch: BranchInfo): string {
    return `${branch.organizationName}${branch.repositoryName}${branch.branchName}`;
  }

  trackBranch(branch: BranchesEntity): void {
    this.branchesFacade.dispatch(BranchesActions.trackBranch({ branch }));
  }

  untrackBranch(branch: BranchesEntity): void {
    this.branchesFacade.dispatch(BranchesActions.untrackBranch({ branch }));
  }
}
