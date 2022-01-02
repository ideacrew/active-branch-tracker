import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerUpdateService {
  constructor(appReference: ApplicationRef, updates: SwUpdate) {
    const appIsStable$ = appReference.isStable.pipe(
      first(isStable => isStable === true),
    );
    const everyOneHour$ = interval(1 * 60 * 60 * 1000);
    const everyHourOnceAppIsStable$ = concat(appIsStable$, everyOneHour$);

    const updatesAvailable = updates.versionUpdates.pipe(
      filter(
        (event): event is VersionReadyEvent => event.type === 'VERSION_READY',
      ),
      map(event => ({
        type: 'UPDATE_AVAILABLE',
        current: event.currentVersion,
        available: event.latestVersion,
      })),
    );

    if (environment.production === true) {
      everyHourOnceAppIsStable$
        .pipe(switchMap(() => updates.checkForUpdate()))
        .subscribe();

      updatesAvailable
        .pipe(switchMap(() => updates.activateUpdate()))
        .subscribe(() => document.location.reload());
    }
  }
}
