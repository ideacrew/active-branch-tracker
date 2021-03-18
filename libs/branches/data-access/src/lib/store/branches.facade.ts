import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromBranches from './branches.reducer';
import * as BranchesSelectors from './branches.selectors';
import { loadBranches } from './branches.actions';

@Injectable()
export class BranchesFacade {
  loaded$ = this.store.pipe(select(BranchesSelectors.getBranchesLoaded));
  allBranches$ = this.store.pipe(select(BranchesSelectors.getAllBranches));
  selectedBranches$ = this.store.pipe(select(BranchesSelectors.getSelected));

  defaultBranches$ = this.store.pipe(
    select(BranchesSelectors.getDefaultBranches),
  );

  trackedBranches$ = this.store.pipe(
    select(BranchesSelectors.getTrackedBranches),
  );
  untrackedBranches$ = this.store.pipe(
    select(BranchesSelectors.getUntrackedBranches),
  );

  filteredBranches$ = this.store.pipe(
    select(BranchesSelectors.getFilteredBranches),
  );

  constructor(private store: Store<fromBranches.BranchesPartialState>) {
    this.dispatch(loadBranches());
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
