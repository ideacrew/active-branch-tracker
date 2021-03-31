import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as BranchesActions from './branches.actions';
import { map, exhaustMap } from 'rxjs/operators';
import { BranchListService } from '../branch-list.service';

@Injectable()
export class BranchesEffects {
  loadBranches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchesActions.loadBranches),
      fetch({
        run: () =>
          this.branchListService
            .queryBranches()
            .pipe(
              map(branches =>
                BranchesActions.loadBranchesSuccess({ branches }),
              ),
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return BranchesActions.loadBranchesFailure({ error });
        },
      }),
    ),
  );

  trackBranch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchesActions.trackBranch),
      exhaustMap(async ({ branch }) =>
        this.branchListService.trackBranch(branch),
      ),
      map(() => BranchesActions.trackBranchSuccess()),
    ),
  );

  untrackBranch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchesActions.untrackBranch),
      exhaustMap(async ({ branch }) =>
        this.branchListService.untrackBranch(branch),
      ),
      map(() => BranchesActions.untrackBranchSuccess()),
    ),
  );

  setStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchesActions.setBranchStatus),
      exhaustMap(async ({ branchId, status }) =>
        this.branchListService.setBranchStatus(branchId, status),
      ),
      map(() => BranchesActions.setBranchStatusSuccess()),
    ),
  );

  constructor(
    private actions$: Actions,
    private branchListService: BranchListService,
  ) {}
}
