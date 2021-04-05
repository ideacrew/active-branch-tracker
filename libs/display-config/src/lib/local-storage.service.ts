import { Injectable } from '@angular/core';
import { DisplayConfig } from './displayConfig';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  setSavedState(state: DisplayConfig, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): DisplayConfig {
    const config: string = localStorage.getItem(localStorageKey);
    const displayConfig: DisplayConfig = JSON.parse(config) as DisplayConfig;

    return displayConfig;
  }
}
