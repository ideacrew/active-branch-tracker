import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromUser from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  firebaseUID$ = this.store.pipe(select(AuthSelectors.getUID));

  constructor(private store: Store<fromUser.UserPartialState>) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
