import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  uid: string | undefined;
  displayName?: string | null;
  email?: string | null;
  error: string | undefined;
}

export interface UserPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  uid: undefined,
  error: undefined,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.setCurrentUser, (state, { userDetails }) => ({
    ...state,
    ...userDetails,
  })),
  on(AuthActions.logout, state => initialState),

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
  state: AuthState | undefined,
  action: Action,
): AuthState {
  return authReducer(state, action);
}
