import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => this.authService.login()),
      tap(credential => console.log('User Credential', credential)),
      map(() => AuthActions.loginSuccess()),
      catchError((error: string) => of(AuthActions.loginFailure())),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => AuthActions.logoutSuccess()),
    ),
  );

  authState$ = createEffect(() =>
    this.authService.user$.pipe(
      filter(user => !!user),
      map(user => {
        const firebaseUser = user as firebase.User;

        return {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
        };
      }),
      map(userDetails => AuthActions.setCurrentUser({ userDetails })),
    ),
  );

  // loadUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loginSuccess),
  //     switchMap(() =>
  //       this.authService.user$.pipe(
  //         filter<firebase.User | null>(user => user !== null),
  //         map(user => {
  //           const forSureUser = user as firebase.User;
  //           return UserActions.loadUser({ userAuth: forSureUser });
  //         }),
  //       ),
  //     ),
  //   ),
  // );

  // loadUserEntity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loadUser),
  //     switchMap(({ userAuth }) =>
  //       this.authService
  //         .getUserRef(userAuth)
  //         .pipe(
  //           map(userEntity =>
  //             UserActions.loadUserSuccess({ user: userEntity }),
  //           ),
  //         ),
  //     ),
  //   ),
  // );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
