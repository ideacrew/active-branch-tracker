import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ENVIRONMENTS_FEATURE_KEY,
  State,
  EnvironmentsPartialState,
  environmentsAdapter,
} from './environments.reducer';

// Lookup the 'Environments' feature state managed by NgRx
export const getEnvironmentsState = createFeatureSelector<
  EnvironmentsPartialState,
  State
>(ENVIRONMENTS_FEATURE_KEY);

const { selectAll, selectEntities } = environmentsAdapter.getSelectors();

export const getEnvironmentsLoaded = createSelector(
  getEnvironmentsState,
  (state: State) => state.loaded,
);

export const getEnvironmentsError = createSelector(
  getEnvironmentsState,
  (state: State) => state.error,
);

export const getAllEnvironments = createSelector(
  getEnvironmentsState,
  (state: State) => selectAll(state),
);

export const getEnvironmentsEntities = createSelector(
  getEnvironmentsState,
  (state: State) => selectEntities(state),
);

export const getSelectedId = createSelector(
  getEnvironmentsState,
  (state: State) => state.selectedId,
);

export const getSelected = createSelector(
  getEnvironmentsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId],
);
