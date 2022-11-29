import { createReducer, on, Action } from '@ngrx/store';

import * as DisplayConfigActions from './display-config.actions';
import { DisplayConfig } from '../display-config';

export const DISPLAYCONFIG_FEATURE_KEY = 'displayConfig';

export type State = DisplayConfig;

export interface DisplayConfigPartialState {
  readonly [DISPLAYCONFIG_FEATURE_KEY]: State;
}

export const defaultConfig: DisplayConfig = {
  deployedBranches: 'collapsed',
  trackedBranches: 'collapsed',
  untrackedBranches: 'collapsed',
};

export const initialState: State = {
  // set initial required properties
  ...defaultConfig,
};

const displayConfigReducer = createReducer(
  initialState,
  on(
    DisplayConfigActions.loadDisplayConfig,
    (state): State => ({
      ...state,
    }),
  ),
  on(
    DisplayConfigActions.loadDisplayConfigSuccess,
    (state, { displayConfig }): State => ({ ...state, ...displayConfig }),
  ),

  on(
    DisplayConfigActions.expandDeployedBranches,
    (state): State => ({
      ...state,
      deployedBranches: 'expanded',
    }),
  ),
  on(
    DisplayConfigActions.collapseDeployedBranches,
    (state): State => ({
      ...state,
      deployedBranches: 'collapsed',
    }),
  ),
  on(
    DisplayConfigActions.expandTrackedBranches,
    (state): State => ({
      ...state,
      trackedBranches: 'expanded',
    }),
  ),
  on(
    DisplayConfigActions.collapseTrackedBranches,
    (state): State => ({
      ...state,
      trackedBranches: 'collapsed',
    }),
  ),
  on(
    DisplayConfigActions.expandUntrackedBranches,
    (state): State => ({
      ...state,
      untrackedBranches: 'expanded',
    }),
  ),
  on(
    DisplayConfigActions.collapseUntrackedBranches,
    (state): State => ({
      ...state,
      untrackedBranches: 'collapsed',
    }),
  ),
);

export const reducer = (state: State | undefined, action: Action): State =>
  displayConfigReducer(state, action);
