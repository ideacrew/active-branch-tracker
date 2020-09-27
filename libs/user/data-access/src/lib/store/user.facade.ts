import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Observable, OperatorFunction, pipe, UnaryFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserEntity } from './user.models';

import * as fromUser from './user.reducer';
import * as UserSelectors from './user.selectors';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  loaded$ = this.store.pipe(select(UserSelectors.getUserLoaded));
  user$: Observable<UserEntity | undefined> = this.store.pipe(
    select(UserSelectors.getUser),
  );

  constructor(private store: Store<fromUser.UserPartialState>) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}

// function filterNullish<T>(): UnaryFunction<
//   Observable<T | null | undefined>,
//   Observable<T>
// > {
//   return pipe(
//     filter(x => x != null) as OperatorFunction<T | null | undefined, T>,
//   );
// }
