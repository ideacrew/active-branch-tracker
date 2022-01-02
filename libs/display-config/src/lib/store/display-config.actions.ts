import { createAction, props } from '@ngrx/store';
import { DisplayConfig } from '../display-config';

export const loadDisplayConfig = createAction(
  '[DisplayConfig] Load Display Config',
);

export const loadDisplayConfigSuccess = createAction(
  '[DisplayConfig] Load Display Config Success',
  props<{ displayConfig: DisplayConfig }>(),
);

export const loadDisplayConfigFailure = createAction(
  '[DisplayConfig] Load Display Config Failure',
);

export const expandUntrackedBranches = createAction(
  '[DisplayConfig] Expand Untracked Branches',
);
export const collapseUntrackedBranches = createAction(
  '[DisplayConfig] Collapse Untracked Branches',
);

export const expandTrackedBranches = createAction(
  '[DisplayConfig] Expand Tracked Branches',
);
export const collapseTrackedBranches = createAction(
  '[DisplayConfig] Collapse Tracked Branches',
);
export const expandDeployedBranches = createAction(
  '[DisplayConfig] Expand Deployed Branches',
);
export const collapseDeployedBranches = createAction(
  '[DisplayConfig] Collapse Deployed Branches',
);
