import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, tap, switchMap } from 'rxjs/operators';

import * as DisplayConfigActions from './display-config.actions';
import { DisplayConfigFacade } from './display-config.facade';
import { LocalStorageService } from '../local-storage.service';
import { DisplayConfig } from '../displayConfig';

@Injectable()
export class DisplayConfigEffects {
  loadDisplayConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DisplayConfigActions.loadDisplayConfigSuccess),
      map(({ displayConfig }) =>
        DisplayConfigActions.loadDisplayConfigSuccess({ displayConfig }),
      ),
    ),
  );

  setLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          DisplayConfigActions.collapseDeployedBranches,
          DisplayConfigActions.expandDeployedBranches,
          DisplayConfigActions.collapseTrackedBranches,
          DisplayConfigActions.expandTrackedBranches,
          DisplayConfigActions.expandUntrackedBranches,
          DisplayConfigActions.collapseUntrackedBranches,
        ),
        switchMap(() => this.displayConfigFacade.fullConfig$),
        tap((config: DisplayConfig) =>
          this.localStorageService.setSavedState(config, 'config'),
        ),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private actions$: Actions,
    private displayConfigFacade: DisplayConfigFacade,
    private localStorageService: LocalStorageService,
  ) {}
}
