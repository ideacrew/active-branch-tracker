import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { DisplayConfig, DisplayType } from './displayConfig';

const defaultConfig = {
  deployedBranches: DisplayType.Collapsed,
  trackedBranches: DisplayType.Collapsed,
  untrackedBranches: DisplayType.Collapsed,
};

@Injectable({
  providedIn: 'root',
})
export class DisplayConfigService {
  config: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('config'),
  );

  config$: Observable<DisplayConfig> = this.config.asObservable().pipe(
    distinctUntilChanged(),
    map(config => JSON.parse(config)),
  );

  constructor() {
    if (localStorage.getItem('config') === null) {
      const configString = JSON.stringify(defaultConfig);
      localStorage.setItem('config', configString);
      this.config.next(configString);
    } else {
      this.updateConfig();
    }
  }

  setConfig(config: Partial<DisplayConfig>): void {
    const currentConfig = JSON.parse(
      localStorage.getItem('config'),
    ) as DisplayConfig;

    const newConfig = JSON.stringify({
      ...currentConfig,
      ...config,
    });

    localStorage.setItem('config', newConfig);
    this.config.next(newConfig);
  }

  updateConfig(): void {
    const {
      deployedBranches,
      trackedBranches,
      untrackedBranches,
      ...leftoverProperties
    } = JSON.parse(this.config.value) as DisplayConfig;

    const updatedConfig = {
      ...defaultConfig,
      deployedBranches,
      untrackedBranches,
      trackedBranches,
    };

    this.setConfig(updatedConfig);
  }
}
