import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  BranchInfo,
  BranchListService,
  CheckSuiteConclusion,
} from '@idc/branches/data-access';
import {
  DisplayConfigService,
  DisplayConfig,
  DisplayType,
} from '@idc/display-config';

import {
  getPullRequestLink,
  getFailurePercentage,
  getBranchLink,
  getCommitLink,
  BranchInfoVM,
} from '@idc/util';

export interface SeparateBranchInfo {
  defaultBranches: BranchInfoVM[];
  otherBranches: BranchInfoVM[];
  trackedBranches: BranchInfoVM[];
}

export interface ActiveBranchesVM {
  defaultBranches: BranchInfoVM[];
  otherBranches: BranchInfoVM[];
  trackedBranches: BranchInfoVM[];
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
    public configService: DisplayConfigService
  ) {}

  ngOnInit(): void {
    this.branchInfo$ = this.branchListService.branchInfo$.pipe(
      map(branchInfo => {
        const defaultBranches = branchInfo
          .filter(branch => branch.defaultBranch === true)
          .map(addVMDetails)
          .sort(sortByTime);

        const otherBranches = branchInfo
          .filter(
            branch => branch.defaultBranch === false && branch.tracked === false
          )
          .map(addVMDetails)
          .sort(sortByTime);

        const trackedBranches = branchInfo
          .filter(branch => branch.tracked === true)
          .map(addVMDetails)
          .sort(sortByTime);

        return {
          defaultBranches,
          otherBranches,
          trackedBranches,
        };
      })
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
      })
    );
  }

  trackByBranchName(index: number, branch: BranchInfo): string {
    return `${branch.organizationName}${branch.repositoryName}${branch.branchName}`;
  }
}

function addVMDetails(branch: BranchInfo): BranchInfoVM {
  return {
    ...branch,
    branchLink: getBranchLink(branch),
    commitLink: getCommitLink(branch),
    pullRequestLink: getPullRequestLink(branch),
    failurePercentage: getFailurePercentage(branch),
  };
}

function sortByTime(branchA: BranchInfo, branchB: BranchInfo): number {
  const { updated_at: updatedA, created_at: createdA } = branchA;
  const { updated_at: updatedB, created_at: createdB } = branchB;

  return new Date(updatedA || createdA).getTime() >
    new Date(updatedB || createdB).getTime()
    ? -1
    : 1;
}
