import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { BranchInfo, BranchStatus, CheckSuiteConclusion } from '@idc/util';
import {
  BranchesFacade,
  BranchesEntity,
  BranchesActions,
} from '@idc/branches/data-access';
import { DisplayType, DisplayConfigFacade } from '@idc/display-config';
import { AuthService } from '@idc/auth';

@Component({
  selector: 'idc-active-branches',
  templateUrl: './active-branches.component.html',
  styleUrls: ['./active-branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveBranchesComponent implements OnInit {
  CheckSuiteConclusion = CheckSuiteConclusion;
  DisplayType = DisplayType;
  searchQuery = new FormControl('');

  trackedBranchesVM$ = combineLatest([
    this.branchesFacade.trackedBranches$,
    this.configFacade.trackedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  untrackedBranchesVM$ = combineLatest([
    this.branchesFacade.untrackedBranches$,
    this.configFacade.untrackedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  loggedIn$: Observable<boolean> = this.auth.user$.pipe(map(user => !!user));

  constructor(
    public branchesFacade: BranchesFacade,
    public configFacade: DisplayConfigFacade,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((query: string) =>
          this.branchesFacade.dispatch(
            BranchesActions.queryBranches({ query }),
          ),
        ),
      )
      .subscribe();
  }

  trackByBranchName(index: number, branch: BranchInfo): string {
    return `${branch.organizationName}${branch.repositoryName}${branch.branchName}`;
  }

  trackBranch(branch: BranchesEntity): void {
    this.branchesFacade.dispatch(BranchesActions.trackBranch({ branch }));
  }

  untrackBranch(branch: BranchesEntity): void {
    this.branchesFacade.dispatch(BranchesActions.untrackBranch({ branch }));
  }

  setBranchStatus({
    branchId,
    status,
  }: {
    branchId: string;
    status: BranchStatus;
  }): void {
    this.branchesFacade.dispatch(
      BranchesActions.setBranchStatus({ branchId, status }),
    );
  }
}
