import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { filter, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { AuthService } from '../auth.service';
import { auth } from 'firebase';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(() => this.authService.login()),
      map((user: auth.UserCredential) => {
        console.log({ user });
        return UserActions.loginSuccess();
      }),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => UserActions.logoutSuccess()),
    ),
  );

  authState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      switchMap(() =>
        this.authService.afAuth.user.pipe(
          map(user =>
            UserActions.loadUser({ userAuth: user as firebase.User }),
          ),
        ),
      ),
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

  constructor(private actions$: Actions, private authService: AuthService) {}
}
