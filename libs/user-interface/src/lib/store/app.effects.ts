import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromApp from './app.reducer';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {


  constructor(private actions$: Actions) {}
}
