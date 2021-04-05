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
import { AuthService } from '@idc/auth';

import * as BranchesActions from './branches.actions';
import { BranchListService } from '../branch-list.service';

@Injectable()
export class BranchesEffects {
  loadBranches$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BranchesActions.loadBranches),
        withLatestFrom(action => {
          console.log('Concatenating latest from');
          return this.authService.user$;
        }),
        switchMap(user => {
          console.log({ user });
          return this.branchListService.queryBranches().pipe(
            tap(() => console.log('Tap method of branches effects')),
            map(branches => BranchesActions.loadBranchesSuccess({ branches })),
            catchError((error: string) =>
              of(BranchesActions.loadBranchesFailure({ error })),
            ),
          );
        }),
      ),
    { dispatch: false },
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
  ) {}
}
