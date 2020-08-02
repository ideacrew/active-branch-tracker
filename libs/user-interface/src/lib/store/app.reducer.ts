import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from './app.actions';
import { SidebarState } from '../models/sidebarState.enum';

export const APP_FEATURE_KEY = 'app';

export interface State {
  sidebarCollapsed: SidebarState;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const initialState: State = {
  sidebarCollapsed: SidebarState.Collapsed,
};

const appReducer = createReducer(
  initialState,
  on(AppActions.collapseSidebar, state => ({
    ...state,
    sidebarCollapsed: SidebarState.Collapsed,
  })),
  on(AppActions.expandSidebar, state => ({
    ...state,
    sidebarCollapsed: SidebarState.Expanded,
  })),
);

export function reducer(state: State | undefined, action: Action): State {
  return appReducer(state, action);
}
