import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login with Google');
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: unknown }>(),
);

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
