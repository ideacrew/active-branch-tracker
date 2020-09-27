import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  user: UserEntity | undefined;
  loaded: boolean; // has the User list been loaded
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialState: UserState = {
  user: undefined,
  loaded: false,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({ ...state, user })),
  // on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(
  state: UserState | undefined,
  action: Action,
): UserState {
  return userReducer(state, action);
}
