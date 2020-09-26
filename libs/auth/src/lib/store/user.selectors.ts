import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState, UserPartialState } from './user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const getUserState = createFeatureSelector<UserPartialState, UserState>(
  USER_FEATURE_KEY,
);

export const getAuth = createSelector(
  getUserState,
  userState => userState.firebaseUser,
);

export const getUser = createSelector(
  getUserState,
  userState => userState.firebaseUser,
);
