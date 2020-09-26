import { createReducer, on, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  isAuthenticated: boolean;
  firebaseUser: firebase.User | null;
  errorMessage: string | null;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialState: UserState = {
  isAuthenticated: false,
  firebaseUser: null,
  errorMessage: null,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.login, state => ({ ...state })),
  on(UserActions.loginSuccess, state => ({ ...state })),
  on(UserActions.loginFailure, state => ({ ...state })),

  // on(UserActions.loadUser, (state, { userAuth }) => ({
  //   ...state,
  //   firebaseUser: userAuth,
  // })),
  // on(UserActions.loadUserSuccess, (state, { user }) => {
  //   return { ...state, user };
  // }),

  // on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(
  state: UserState | undefined,
  action: Action,
): UserState {
  return userReducer(state, action);
}
