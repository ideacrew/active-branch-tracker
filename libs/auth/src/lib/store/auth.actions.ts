import { createAction, props } from '@ngrx/store';

export const loginWithGoogle = createAction('[Auth] Login with Google');
export const loginWithGoogleSuccess = createAction('[Auth] Login Success');
export const loginWithGoogleFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: unknown }>(),
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');

export const loginWithEmailPassword = createAction(
  '[Auth] Login With Email/Password',
  props<{ email: string; password: string }>(),
);
export const loginWithEmailPasswordSuccess = createAction(
  '[Auth] Login Success',
);
export const loginWithEmailPasswordFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: { code: string; message: string; } }>(),
);

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
