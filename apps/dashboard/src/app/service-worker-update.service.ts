import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerUpdateService {
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    const appIsStable$ = appRef.isStable.pipe(
      first(isStable => isStable === true),
    );
    const everyOneHour$ = interval(1 * 60 * 60 * 1000);
    const everyHourOnceAppIsStable$ = concat(appIsStable$, everyOneHour$);

    if (environment.production === true) {
      everyHourOnceAppIsStable$
        .pipe(switchMap(() => updates.checkForUpdate()))
        .subscribe();

      updates.available
        .pipe(switchMap(() => updates.activateUpdate()))
        .subscribe(() => document.location.reload());
    }
  }
}
