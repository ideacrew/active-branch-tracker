import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'User' feature state managed by NgRx
export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectUID = createSelector(
  selectAuthState,
  userState => userState.uid,
);

export const selectLoggedInState = createSelector(selectUID, uid => !!uid);

export const selectErrorMessage = createSelector(
  selectAuthState,
  state => state.error?.message,
);
