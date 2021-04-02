import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BranchesActions from './branches.actions';
import { BranchesEntity } from './branches.models';

export const BRANCHES_FEATURE_KEY = 'branches';

export interface State extends EntityState<BranchesEntity> {
  selectedId?: string | number; // which Branches record has been selected
  loaded: boolean; // has the Branches list been loaded
  error?: string | null; // last known error (if any)
  query?: string;
}

export interface BranchesPartialState {
  readonly [BRANCHES_FEATURE_KEY]: State;
}

const sortByTime = (
  branchA: BranchesEntity,
  branchB: BranchesEntity,
): number => {
  const { updated_at: updatedA, created_at: createdA } = branchA;
  const { updated_at: updatedB, created_at: createdB } = branchB;

  return new Date(updatedA || createdA).getTime() >
    new Date(updatedB || createdB).getTime()
    ? -1
    : 1;
};

export const branchesAdapter: EntityAdapter<BranchesEntity> = createEntityAdapter<BranchesEntity>(
  {
    sortComparer: sortByTime,
  },
);

export const initialState: State = branchesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const branchesReducer = createReducer(
  initialState,
  on(BranchesActions.loadBranches, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BranchesActions.loadBranchesSuccess, (state, { branches }) =>
    branchesAdapter.setAll(branches, { ...state, loaded: true }),
  ),
  on(BranchesActions.loadBranchesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BranchesActions.queryBranches, (state, { query }) => ({
    ...state,
    query,
  })),
);

export const reducer = (state: State | undefined, action: Action): State =>
  branchesReducer(state, action);
