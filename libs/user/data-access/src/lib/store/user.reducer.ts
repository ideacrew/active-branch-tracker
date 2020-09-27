import { createReducer, on, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  firestoreUser: UserEntity | undefined;
  loaded: boolean; // has the User list been loaded
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialState: UserState = {
  firestoreUser: undefined,
  loaded: false,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    firestoreUser: user,
    loaded: true,
  })),
  on(UserActions.clearCurrentUser, state => initialState),
  // on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(
  state: UserState | undefined,
  action: Action,
): UserState {
  return userReducer(state, action);
}
