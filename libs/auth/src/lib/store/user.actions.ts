import { createAction, props } from '@ngrx/store';
import { UserEntity } from './user.models';

export const login = createAction('[User] Login with Google');
export const loginSuccess = createAction('[User] Login Success');
export const loginFailure = createAction('[User] Login Failure');

export const logout = createAction('[User] Logout');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure = createAction('[User] Logout Failure');

export const loadUser = createAction(
  '[User] Load User from DB',
  props<{ userAuth: firebase.User }>(),
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: UserEntity | undefined }>(),
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>(),
);
