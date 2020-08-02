import { createAction, props } from '@ngrx/store';
import { BranchesEntity } from './branches.models';

export const loadBranches = createAction('[Branches] Load Branches');

export const loadBranchesSuccess = createAction(
  '[Branches] Load Branches Success',
  props<{ branches: BranchesEntity[] }>(),
);

export const loadBranchesFailure = createAction(
  '[Branches] Load Branches Failure',
  props<{ error: string }>(),
);

export const untrackBranch = createAction(
  '[Branches] Untrack Branch',
  props<{ branch: BranchesEntity }>(),
);

export const untrackBranchSuccess = createAction(
  '[Branches] Untrack Branch Success',
);

export const trackBranch = createAction(
  '[Branches] Track Branch',
  props<{ branch: BranchesEntity }>(),
);

export const trackBranchSuccess = createAction(
  '[Branches] Track Branch Success',
);
