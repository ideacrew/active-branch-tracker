import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DISPLAYCONFIG_FEATURE_KEY, State } from './display-config.reducer';

// Lookup the 'DisplayConfig' feature state managed by NgRx
export const getDisplayConfigState = createFeatureSelector<State>(
  DISPLAYCONFIG_FEATURE_KEY,
);

export const trackedBranchesDisplay = createSelector(
  getDisplayConfigState,
  (state: State) => state.trackedBranches,
);
export const untrackedBranchesDisplay = createSelector(
  getDisplayConfigState,
  (state: State) => state.untrackedBranches,
);
export const deployedBranchesDisplay = createSelector(
  getDisplayConfigState,
  (state: State) => state.deployedBranches,
);
