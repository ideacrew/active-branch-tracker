import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { BranchInfo, CheckSuiteConclusion } from '@idc/util';
import {
  BranchesFacade,
  BranchesEntity,
  BranchesActions,
} from '@idc/branches/data-access';
import {
  DisplayConfigService,
  DisplayConfig,
  DisplayType,
} from '@idc/display-config';

export interface SeparateBranchInfo {
  defaultBranches: BranchesEntity[];
  deployedBranches: BranchesEntity[];
  trackedBranches: BranchesEntity[];
  untrackedBranches: BranchesEntity[];
}

export interface ActiveBranchesVM extends SeparateBranchInfo {
  config: DisplayConfig;
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

  // time$: Observable<Date> = timer(0, 60000).pipe(
  //   map(tick => new Date()),
  //   shareReplay(1)
  // );

  branches$: Observable<SeparateBranchInfo> = combineLatest([
    this.branchesFacade.defaultBranches$,
    this.branchesFacade.deployedBranches$,
    this.branchesFacade.trackedBranches$,
    this.branchesFacade.untrackedBranches$,
  ]).pipe(
    map(
      ([
        defaultBranches,
        deployedBranches,
        trackedBranches,
        untrackedBranches,
      ]) => {
        const separateBranchInfo: SeparateBranchInfo = {
          defaultBranches,
          deployedBranches,
          trackedBranches,
          untrackedBranches,
        };
        return separateBranchInfo;
      },
    ),
  );

  activeBranchesVm$: Observable<ActiveBranchesVM> = combineLatest([
    this.branches$,
    this.configService.config$,
  ]).pipe(
    map(([branchInfo, config]: [SeparateBranchInfo, DisplayConfig]) => {
      return {
        ...branchInfo,
        config,
      };
    }),
  );

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
