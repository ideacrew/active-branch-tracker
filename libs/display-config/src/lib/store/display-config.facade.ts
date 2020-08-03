import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromDisplayConfig from './display-config.reducer';
import * as DisplayConfigSelectors from './display-config.selectors';
import { DisplayConfig, DisplayType } from '../displayConfig';
import {
  collapseUntrackedBranches,
  expandUntrackedBranches,
  collapseTrackedBranches,
  expandTrackedBranches,
  collapseDeployedBranches,
  expandDeployedBranches,
} from './display-config.actions';

@Injectable()
export class DisplayConfigFacade {
  trackedBranchesDisplay$ = this.store.pipe(
    select(DisplayConfigSelectors.trackedBranchesDisplay),
  );
  untrackedBranchesDisplay$ = this.store.pipe(
    select(DisplayConfigSelectors.untrackedBranchesDisplay),
  );
  deployedBranchesDisplay$ = this.store.pipe(
    select(DisplayConfigSelectors.deployedBranchesDisplay),
  );
  fullConfig$: Observable<DisplayConfig> = this.store.pipe(
    select(DisplayConfigSelectors.getDisplayConfigState),
  );

  constructor(
    private store: Store<fromDisplayConfig.DisplayConfigPartialState>,
  ) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  setUntrackedBranches(display: DisplayType): void {
    display === DisplayType.Collapsed
      ? this.dispatch(collapseUntrackedBranches())
      : this.dispatch(expandUntrackedBranches());
  }
  setTrackedBranches(display: DisplayType): void {
    display === DisplayType.Collapsed
      ? this.dispatch(collapseTrackedBranches())
      : this.dispatch(expandTrackedBranches());
  }

  setDeployedBranches(display: DisplayType): void {
    display === DisplayType.Collapsed
      ? this.dispatch(collapseDeployedBranches())
      : this.dispatch(expandDeployedBranches());
  }
}
