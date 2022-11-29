import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DISPLAYCONFIG_FEATURE_KEY, State } from './display-config.reducer';

// Lookup the 'DisplayConfig' feature state managed by NgRx
export const selectDisplayConfigState = createFeatureSelector<State>(
  DISPLAYCONFIG_FEATURE_KEY,
);

export const selectTrackedBranchesDisplay = createSelector(
  selectDisplayConfigState,
  (state: State) => state.trackedBranches,
);
export const selectUntrackedBranchesDisplay = createSelector(
  selectDisplayConfigState,
  (state: State) => state.untrackedBranches,
);
export const selectDeployedBranchesDisplay = createSelector(
  selectDisplayConfigState,
  (state: State) => state.deployedBranches,
);
