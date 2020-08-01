import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromEnvironments from './environments.reducer';
import * as EnvironmentsSelectors from './environments.selectors';

@Injectable()
export class EnvironmentsFacade {
  loaded$ = this.store.pipe(
    select(EnvironmentsSelectors.getEnvironmentsLoaded),
  );
  allEnvironments$ = this.store.pipe(
    select(EnvironmentsSelectors.getAllEnvironments),
  );
  selectedEnvironments$ = this.store.pipe(
    select(EnvironmentsSelectors.getSelected),
  );

  constructor(
    private store: Store<fromEnvironments.EnvironmentsPartialState>,
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
