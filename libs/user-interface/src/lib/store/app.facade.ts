import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from './app.reducer';
import * as AppSelectors from './app.selectors';
import { SidebarState } from '../models/sidebarState.enum';

@Injectable()
export class AppFacade {
  sidebarState$: Observable<SidebarState> = this.store.pipe(
    select(AppSelectors.getSidebarCollapsed),
  );

  constructor(private store: Store<fromApp.AppPartialState>) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
