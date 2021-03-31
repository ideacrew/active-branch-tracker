import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {
  LocalStorageService,
  DisplayConfig,
  DisplayConfigActions,
} from '@idc/display-config';

@Injectable()
export class RootEffects {
  loadLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const displayConfig: DisplayConfig = this.localStorageService.getSavedState(
          'config',
        );

        return DisplayConfigActions.loadDisplayConfigSuccess({
          displayConfig,
        });
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
  ) {}
}
