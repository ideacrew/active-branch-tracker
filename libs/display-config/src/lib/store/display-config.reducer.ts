import { createReducer, on, Action } from '@ngrx/store';

import * as DisplayConfigActions from './display-config.actions';
import { DisplayConfig } from '../displayConfig';

export const DISPLAYCONFIG_FEATURE_KEY = 'displayConfig';

export type State = DisplayConfig;

export interface DisplayConfigPartialState {
  readonly [DISPLAYCONFIG_FEATURE_KEY]: State;
}

const defaultConfig: DisplayConfig = {
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
  on(DisplayConfigActions.loadDisplayConfig, state => ({
    ...state,
  })),
  on(
    DisplayConfigActions.loadDisplayConfigSuccess,
    (state, { displayConfig }) => ({ ...state, ...displayConfig }),
  ),

  on(DisplayConfigActions.expandDeployedBranches, state => ({
    ...state,
    deployedBranches: 'expanded',
  })),
  on(DisplayConfigActions.collapseDeployedBranches, state => ({
    ...state,
    deployedBranches: 'collapsed',
  })),
  on(DisplayConfigActions.expandTrackedBranches, state => ({
    ...state,
    trackedBranches: 'expanded',
  })),
  on(DisplayConfigActions.collapseTrackedBranches, state => ({
    ...state,
    trackedBranches: 'collapsed',
  })),
  on(DisplayConfigActions.expandUntrackedBranches, state => ({
    ...state,
    untrackedBranches: 'expanded',
  })),
  on(DisplayConfigActions.collapseUntrackedBranches, state => ({
    ...state,
    untrackedBranches: 'collapsed',
  })),
);

export const reducer = (state: State | undefined, action: Action): State =>
  displayConfigReducer(state, action);
