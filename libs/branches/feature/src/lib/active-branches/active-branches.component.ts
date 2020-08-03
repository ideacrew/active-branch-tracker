import { Component, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest } from 'rxjs';

import { BranchInfo, CheckSuiteConclusion } from '@idc/util';
import {
  BranchesFacade,
  BranchesEntity,
  BranchesActions,
} from '@idc/branches/data-access';
import { DisplayType, DisplayConfigFacade } from '@idc/display-config';
import { map } from 'rxjs/operators';

interface BranchVM {
  branches: BranchesEntity[];
  display: DisplayType;
}

@Component({
  selector: 'idc-active-branches',
  templateUrl: './active-branches.component.html',
  styleUrls: ['./active-branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveBranchesComponent {
  CheckSuiteConclusion = CheckSuiteConclusion;
  DisplayType = DisplayType;

  deployedBranchesVM$ = combineLatest([
    this.branchesFacade.deployedBranches$,
    this.configFacade.deployedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  trackedBranchesVM$ = combineLatest([
    this.branchesFacade.trackedBranches$,
    this.configFacade.trackedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  untrackedBranchesVM$ = combineLatest([
    this.branchesFacade.untrackedBranches$,
    this.configFacade.untrackedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  constructor(
    public branchesFacade: BranchesFacade,
    public configFacade: DisplayConfigFacade,
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

  setBranchStatus({ branchId, status }): void {
    console.log('Setting branch status to', branchId, status);

    this.branchesFacade.dispatch(
      BranchesActions.setBranchStatus({ branchId, status }),
    );
  }
}
