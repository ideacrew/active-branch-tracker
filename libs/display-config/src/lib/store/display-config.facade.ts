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
    if (display === 'collapsed') {
      this.dispatch(collapseUntrackedBranches());
    } else {
      this.dispatch(expandUntrackedBranches());
    }
  }
  setTrackedBranches(display: DisplayType): void {
    if (display === 'collapsed') {
      this.dispatch(collapseTrackedBranches());
    } else {
      this.dispatch(expandTrackedBranches());
    }
  }

  setDeployedBranches(display: DisplayType): void {
    if (display === 'collapsed') {
      this.dispatch(collapseDeployedBranches());
    } else {
      this.dispatch(expandDeployedBranches());
    }
  }
}
