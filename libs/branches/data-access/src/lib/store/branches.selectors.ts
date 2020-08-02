import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BRANCHES_FEATURE_KEY,
  State,
  BranchesPartialState,
  branchesAdapter,
} from './branches.reducer';

// Lookup the 'Branches' feature state managed by NgRx
export const getBranchesState = createFeatureSelector<
  BranchesPartialState,
  State
>(BRANCHES_FEATURE_KEY);

const { selectAll, selectEntities } = branchesAdapter.getSelectors();

export const getBranchesLoaded = createSelector(
  getBranchesState,
  (state: State) => state.loaded,
);

export const getBranchesError = createSelector(
  getBranchesState,
  (state: State) => state.error,
);

export const getAllBranches = createSelector(getBranchesState, (state: State) =>
  selectAll(state),
);

export const getBranchesEntities = createSelector(
  getBranchesState,
  (state: State) => selectEntities(state),
);

export const getSelectedId = createSelector(
  getBranchesState,
  (state: State) => state.selectedId,
);

export const getSelected = createSelector(
  getBranchesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId],
);

export const getDefaultBranches = createSelector(getAllBranches, branches =>
  branches?.filter(branchInfo => branchInfo.defaultBranch),
);

export const getFeatureBranches = createSelector(getAllBranches, branches =>
  branches?.filter(branchInfo => branchInfo.defaultBranch === false),
);

export const getDeployedBranches = createSelector(
  getFeatureBranches,
  branches =>
    branches?.filter(branchInfo => branchInfo.environment?.length > 0),
);

export const getTrackedBranches = createSelector(getFeatureBranches, branches =>
  branches?.filter(branchInfo => branchInfo.tracked && !branchInfo.environment),
);

export const getUntrackedBranches = createSelector(
  getFeatureBranches,
  branches =>
    branches?.filter(
      branchInfo => branchInfo.tracked === false && !branchInfo.environment,
    ),
);
