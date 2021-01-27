import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EnvironmentsActions from './environments.actions';
import { EnvironmentsEntity } from './environments.models';

export const ENVIRONMENTS_FEATURE_KEY = 'environments';

export interface State extends EntityState<EnvironmentsEntity> {
  selectedId?: string | number; // which Environments record has been selected
  loaded: boolean; // has the Environments list been loaded
  error?: { code: string; name: string } | null; // last known error (if any)
}

export interface EnvironmentsPartialState {
  readonly [ENVIRONMENTS_FEATURE_KEY]: State;
}

export const environmentsAdapter: EntityAdapter<EnvironmentsEntity> = createEntityAdapter<EnvironmentsEntity>();

export const initialState: State = environmentsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const environmentsReducer = createReducer(
  initialState,
  on(EnvironmentsActions.loadEnvironments, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(EnvironmentsActions.loadEnvironmentsSuccess, (state, { environments }) =>
    environmentsAdapter.setAll(environments, { ...state, loaded: true }),
  ),
  on(EnvironmentsActions.loadEnvironmentsFailure, (state, { error }) => {
    if (error.code === 'permission-denied') {
      return {
        ...initialState,
        error,
      };
    }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return environmentsReducer(state, action);
}
