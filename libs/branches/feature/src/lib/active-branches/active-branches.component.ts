import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
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
export class ActiveBranchesComponent implements OnDestroy {
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

  searchSub: Subscription = this.searchQuery.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((query: string) => {
        console.log('search query tap');
        this.branchesFacade.dispatch(BranchesActions.queryBranches({ query }));
      }),
    )
    .subscribe();

  constructor(
    public branchesFacade: BranchesFacade,
    public configFacade: DisplayConfigFacade,
    private auth: AuthService,
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

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
