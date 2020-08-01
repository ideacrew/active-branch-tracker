import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { BranchInfo, CheckSuiteConclusion } from '@idc/util';
import { BranchListService } from '@idc/branches/data-access';
import {
  DisplayConfigService,
  DisplayConfig,
  DisplayType,
} from '@idc/display-config';

export interface SeparateBranchInfo {
  defaultBranches: BranchInfo[];
  otherBranches: BranchInfo[];
  trackedBranches: BranchInfo[];
}

export interface ActiveBranchesVM {
  defaultBranches: BranchInfo[];
  otherBranches: BranchInfo[];
  trackedBranches: BranchInfo[];
  config: DisplayConfig;
}

@Component({
  selector: 'idc-active-branches',
  templateUrl: './active-branches.component.html',
  styleUrls: ['./active-branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveBranchesComponent implements OnInit {
  CheckSuiteConclusion = CheckSuiteConclusion;
  DisplayType = DisplayType;
  branchInfo$: Observable<SeparateBranchInfo>;
  activeBranchesVm$: Observable<ActiveBranchesVM>;

  // time$: Observable<Date> = timer(0, 60000).pipe(
  //   map(tick => new Date()),
  //   shareReplay(1)
  // );

  constructor(
    public branchListService: BranchListService,
    public configService: DisplayConfigService,
  ) {}

  ngOnInit(): void {
    this.branchInfo$ = this.branchListService.branchInfo$.pipe(
      map(branchInfo => {
        const defaultBranches = branchInfo
          .filter(branch => branch.defaultBranch === true)
          .sort(sortByTime);

        const otherBranches = branchInfo
          .filter(
            branch =>
              branch.defaultBranch === false && branch.tracked === false,
          )
          .sort(sortByTime);

        const trackedBranches = branchInfo
          .filter(branch => branch.tracked === true)
          .sort(sortByTime);

        return {
          defaultBranches,
          otherBranches,
          trackedBranches,
        };
      }),
    );

    this.activeBranchesVm$ = combineLatest([
      this.branchInfo$,
      this.configService.config$,
    ]).pipe(
      map(([branchInfo, config]: [SeparateBranchInfo, DisplayConfig]) => {
        return {
          ...branchInfo,
          config,
        };
      }),
    );
  }

  trackByBranchName(index: number, branch: BranchInfo): string {
    return `${branch.organizationName}${branch.repositoryName}${branch.branchName}`;
  }
}

function sortByTime(branchA: BranchInfo, branchB: BranchInfo): number {
  const { updated_at: updatedA, created_at: createdA } = branchA;
  const { updated_at: updatedB, created_at: createdB } = branchB;

  return new Date(updatedA || createdA).getTime() >
    new Date(updatedB || createdB).getTime()
    ? -1
    : 1;
}
