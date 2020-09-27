import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState, UserPartialState } from './auth.reducer';

// Lookup the 'User' feature state managed by NgRx
export const getAuthState = createFeatureSelector<UserPartialState, AuthState>(
  AUTH_FEATURE_KEY,
);

export const getUID = createSelector(getAuthState, userState => userState.uid);

export const getLoggedIn = createSelector(getUID, uid => !!uid);
