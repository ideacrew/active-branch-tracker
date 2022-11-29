import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as DisplayConfigSelectors from './display-config.selectors';
import { DisplayConfig, DisplayType } from '../display-config';
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
  trackedBranchesDisplay$ = this.store.select(
    DisplayConfigSelectors.selectTrackedBranchesDisplay,
  );
  untrackedBranchesDisplay$ = this.store.select(
    DisplayConfigSelectors.selectUntrackedBranchesDisplay,
  );
  deployedBranchesDisplay$ = this.store.select(
    DisplayConfigSelectors.selectDeployedBranchesDisplay,
  );
  fullConfig$: Observable<DisplayConfig> = this.store.select(
    DisplayConfigSelectors.selectDisplayConfigState,
  );

  constructor(private store: Store) {}

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
