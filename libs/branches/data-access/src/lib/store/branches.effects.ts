import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  exhaustMap,
  tap,
  switchMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthFacade, AuthService } from '@idc/auth';

import * as BranchesActions from './branches.actions';
import { BranchListService } from '../branch-list.service';

@Injectable()
export class BranchesEffects {
  loadBranches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchesActions.loadBranches),
      tap(() => console.log('Load branches action')),
      switchMap(() =>
        this.branchListService
          .queryBranches()
          .pipe(
            map(branches => BranchesActions.loadBranchesSuccess({ branches })),
          ),
      ),
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
    private authService: AuthService,
    private authFacade: AuthFacade,
  ) {}
}
