import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login with Google');
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure');

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');

export const setCurrentUser = createAction(
  '[Auth] Set User Auth',
  props<{
    userDetails: {
      uid: string;
      displayName: string | null;
      email: string | null;
    };
  }>(),
);

// export const loadUser = createAction(
//   '[User] Load User from DB',
//   props<{ userAuth: firebase.User }>(),
// );
// export const loadUserSuccess = createAction(
//   '[User] Load User Success',
//   props<{ user: UserEntity | undefined }>(),
// );
// export const loadUserFailure = createAction(
//   '[User] Load User Failure',
//   props<{ error: string }>(),
// );
