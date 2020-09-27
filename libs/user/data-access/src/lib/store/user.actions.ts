import { createAction, props } from '@ngrx/store';
import { UserEntity } from './user.models';

export const loadUser = createAction(
  '[User] Load User',
  props<{ uid: string }>(),
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: UserEntity | undefined }>(),
);

export const loadUserFailure = createAction('[User] Load User Failure');
