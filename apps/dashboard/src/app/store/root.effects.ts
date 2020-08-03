import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class RootEffects {
  loadLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(v => console.log('ROOT_EFECTS_INIT')),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions) {}
}
