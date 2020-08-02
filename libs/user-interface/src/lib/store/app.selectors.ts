import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, State, AppPartialState } from './app.reducer';

// Lookup the 'App' feature state managed by NgRx
export const getAppState = createFeatureSelector<AppPartialState, State>(
  APP_FEATURE_KEY,
);

export const getSidebarCollapsed = createSelector(
  getAppState,
  state => state.sidebarCollapsed,
);
