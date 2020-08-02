import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromEnvironments from './environments.reducer';
import * as EnvironmentsActions from './environments.actions';
import { EnvironmentsService } from '../environments.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EnvironmentsEffects {
  loadEnvironments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnvironmentsActions.loadEnvironments),
      fetch({
        run: action =>
          this.environmentsService
            .queryEnvironments()
            .pipe(
              map(environments =>
                EnvironmentsActions.loadEnvironmentsSuccess({ environments }),
              ),
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return EnvironmentsActions.loadEnvironmentsFailure({ error });
        },
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private environmentsService: EnvironmentsService,
  ) {}
}
