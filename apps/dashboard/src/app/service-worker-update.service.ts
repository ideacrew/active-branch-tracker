import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerUpdateService {
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    const appIsStable$ = appRef.isStable.pipe(
      first(isStable => isStable === true)
    );
    const everyOneHour$ = interval(1 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everyOneHour$);

    if (environment.production === true) {
      everySixHoursOnceAppIsStable$.subscribe(async () => {
        await updates.checkForUpdate();
      });

      updates.available.subscribe(async () => {
        await updates.activateUpdate();
        document.location.reload();
      });
    }
  }
}
