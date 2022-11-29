import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';

import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  firebaseUID$ = this.store.select(AuthSelectors.selectUID);
  loggedIn$ = this.store.select(AuthSelectors.selectLoggedInState);
  errorMessage$ = this.store.select(AuthSelectors.selectErrorMessage);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
