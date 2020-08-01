import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromEnvironments from './environments.reducer';
import * as EnvironmentsActions from './environments.actions';

@Injectable()
export class EnvironmentsEffects {
  loadEnvironments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnvironmentsActions.loadEnvironments),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EnvironmentsActions.loadEnvironmentsSuccess({
            environments: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return EnvironmentsActions.loadEnvironmentsFailure({ error });
        },
      }),
    ),
  );

  constructor(private actions$: Actions) {}
}
