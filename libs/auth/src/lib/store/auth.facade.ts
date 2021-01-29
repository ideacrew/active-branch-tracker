import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromUser from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  firebaseUID$ = this.store.pipe(select(AuthSelectors.getUID));
  loggedIn$ = this.store.pipe(select(AuthSelectors.getLoggedIn));
  errorMessage$ = this.store.pipe(select(AuthSelectors.getErrorMessage));

  constructor(private store: Store<fromUser.UserPartialState>) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
