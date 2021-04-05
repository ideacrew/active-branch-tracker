import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  uid: string | undefined;
  displayName?: string | null;
  email?: string | null;
  error: { code: string; message: string } | undefined;
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
  on(AuthActions.logout, () => initialState),
  on(AuthActions.loginWithEmailPasswordFailure, (_state, { error }) => ({
    ...initialState,
    error,
  })),
);

export const reducer = (
  state: AuthState | undefined,
  action: Action,
): AuthState => authReducer(state, action);
