/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() =>
        this.authService.login().catch(error => console.log('CATCH', error)),
      ),
      map(() => AuthActions.loginWithGoogleSuccess()),
      catchError((error: unknown) => {
        console.log('CATCH ERROR', error);
        return of(AuthActions.loginWithGoogleFailure({ error }));
      }),
    );
  });

  loginWithEmailPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWithEmailPassword),
      switchMap(({ email, password }) =>
        this.authService.loginWithEmailPassword(email, password),
      ),
      map(() => AuthActions.loginWithEmailPasswordSuccess()),
      catchError((error: { code: string; message: string }) =>
        of(AuthActions.loginWithEmailPasswordFailure({ error })),
      ),
    );
  });

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginWithGoogleFailure),
        tap(() => void this.router.navigate(['/login'])),
      );
    },
    {
      dispatch: false,
    },
  );

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => AuthActions.logoutSuccess()),
    );
  });

  authState$ = createEffect(() => {
    return this.authService.user$.pipe(
      filter(user => !!user),
      map(user => {
        const firebaseUser = user as firebase.User;

        const userDetails = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
        };

        return userDetails;
      }),
      map(userDetails => AuthActions.setCurrentUser({ userDetails })),
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
