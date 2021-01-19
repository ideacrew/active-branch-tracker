import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as UserActions from './user.actions';
import { logoutSuccess, setCurrentUser } from '@idc/auth';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { UserEntity } from './user.models';

@Injectable()
export class UserEffects {
  currentAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentUser),
      map(({ userDetails }) => UserActions.loadUser({ uid: userDetails.uid })),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(({ uid }) => {
        console.log({ uid });
        return this.userService.getUserRef(uid).pipe(
          map((user: UserEntity | undefined) =>
            UserActions.loadUserSuccess({ user }),
          ),
          catchError(e => {
            console.error(e);
            return of(UserActions.loadUserFailure());
          }),
        );
      }),
    ),
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess),
      map(() => UserActions.clearCurrentUser()),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
