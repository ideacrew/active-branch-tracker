import { createReducer, on, Action } from '@ngrx/store';

import * as DisplayConfigActions from './display-config.actions';
import { DisplayConfig, DisplayType } from '../displayConfig';

export const DISPLAYCONFIG_FEATURE_KEY = 'displayConfig';

export type State = DisplayConfig;

export interface DisplayConfigPartialState {
  readonly [DISPLAYCONFIG_FEATURE_KEY]: State;
}

const defaultConfig = {
  deployedBranches: DisplayType.Collapsed,
  trackedBranches: DisplayType.Collapsed,
  untrackedBranches: DisplayType.Collapsed,
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
    deployedBranches: DisplayType.Expanded,
  })),
  on(DisplayConfigActions.collapseDeployedBranches, state => ({
    ...state,
    deployedBranches: DisplayType.Collapsed,
  })),
  on(DisplayConfigActions.expandTrackedBranches, state => ({
    ...state,
    trackedBranches: DisplayType.Expanded,
  })),
  on(DisplayConfigActions.collapseTrackedBranches, state => ({
    ...state,
    trackedBranches: DisplayType.Collapsed,
  })),
  on(DisplayConfigActions.expandUntrackedBranches, state => ({
    ...state,
    untrackedBranches: DisplayType.Expanded,
  })),
  on(DisplayConfigActions.collapseUntrackedBranches, state => ({
    ...state,
    untrackedBranches: DisplayType.Collapsed,
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return displayConfigReducer(state, action);
}
