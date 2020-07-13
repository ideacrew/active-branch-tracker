import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { DisplayConfig, DisplayType } from './displayConfig';

@Injectable({
  providedIn: 'root',
})
export class DisplayConfigService {
  config: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('config')
  );

  config$: Observable<DisplayConfig> = this.config.asObservable().pipe(
    distinctUntilChanged(),
    map(config => JSON.parse(config))
  );

  constructor() {
    if (localStorage.getItem('config') === null) {
      const config: DisplayConfig = {
        trackedBranches: DisplayType.Expanded,
        otherBranches: DisplayType.Expanded,
      };

      const configString = JSON.stringify(config);
      localStorage.setItem('config', configString);
      this.config.next(configString);
    }
  }

  setConfig(config: Partial<DisplayConfig>): void {
    const currentConfig = JSON.parse(
      localStorage.getItem('config')
    ) as DisplayConfig;

    const newConfig = JSON.stringify({
      ...currentConfig,
      ...config,
    });

    localStorage.setItem('config', newConfig);
    this.config.next(newConfig);
  }
}
