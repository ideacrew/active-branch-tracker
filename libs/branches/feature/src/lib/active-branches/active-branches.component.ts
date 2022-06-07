import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';

import { BranchInfo } from '@idc/util';
import { BranchListService } from '@idc/branches/data-access';
import { DisplayConfigFacade } from '@idc/display-config';
import { AuthService } from '@idc/auth';

@Component({
  selector: 'idc-active-branches',
  templateUrl: './active-branches.component.html',
  styleUrls: ['./active-branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveBranchesComponent implements OnDestroy {
  searchQuery = new UntypedFormControl('');

  loggedIn$: Observable<boolean> = this.auth.user$.pipe(
    map(user => user !== null),
  );

  searchSub: Subscription = this.searchQuery.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((query: string) => this.branchesService.query.next(query)),
    )
    .subscribe();

  allBranches$: Observable<BranchInfo[]> =
    this.branchesService.filteredBranches$;

  defaultBranches$ = this.allBranches$.pipe(
    map(branches => branches?.filter(branchInfo => branchInfo.defaultBranch)),
  );

  trackedBranches$ = this.allBranches$.pipe(
    map(branches => branches?.filter(branchInfo => branchInfo.tracked)),
  );

  untrackedBranches$ = this.allBranches$.pipe(
    map(branches =>
      branches?.filter(
        branchInfo => branchInfo.tracked === false && !branchInfo.defaultBranch,
      ),
    ),
  );

  trackedBranchesVM$ = combineLatest([
    this.trackedBranches$,
    this.configFacade.trackedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  untrackedBranchesVM$ = combineLatest([
    this.untrackedBranches$,
    this.configFacade.untrackedBranchesDisplay$,
  ]).pipe(map(([branches, display]) => ({ branches, display })));

  constructor(
    public configFacade: DisplayConfigFacade,
    private auth: AuthService,
    private branchesService: BranchListService,
  ) {}

  trackByBranchName(index: number, branch: BranchInfo): string {
    return `${branch.organizationName}${branch.repositoryName}${branch.branchName}`;
  }

  async trackBranch(branch: BranchInfo): Promise<void> {
    await this.branchesService.trackBranch(branch);
  }

  async untrackBranch(branch: BranchInfo): Promise<void> {
    await this.branchesService.untrackBranch(branch);
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
