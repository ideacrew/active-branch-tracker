import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as fromEnvironments from './environments.reducer';
import * as EnvironmentsSelectors from './environments.selectors';
import { loadEnvironments } from './environments.actions';

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

  dchbxEnvironments$ = this.store.pipe(
    select(EnvironmentsSelectors.dchbxEnvironments),
  );
  maEnvironments$ = this.store.pipe(
    select(EnvironmentsSelectors.maEnvironments),
  );

  constructor(private store: Store<fromEnvironments.EnvironmentsPartialState>) {
    this.dispatch(loadEnvironments());
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
