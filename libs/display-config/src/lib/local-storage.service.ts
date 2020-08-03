import { Injectable } from '@angular/core';
import { DisplayConfig } from './displayConfig';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  setSavedState(state: DisplayConfig, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): DisplayConfig {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }
}
