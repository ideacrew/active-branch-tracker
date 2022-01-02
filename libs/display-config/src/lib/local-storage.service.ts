import { Injectable } from '@angular/core';
import { DisplayConfig } from './display-config';
import { defaultConfig } from './store/display-config.reducer';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  setSavedState(state: DisplayConfig, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): DisplayConfig {
    const config: string =
      localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultConfig);
    const displayConfig: DisplayConfig = JSON.parse(config) as DisplayConfig;

    return displayConfig;
  }
}
