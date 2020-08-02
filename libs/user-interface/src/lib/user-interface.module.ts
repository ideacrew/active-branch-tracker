import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { AppEffects } from './store/app.effects';
import { AppFacade } from './store/app.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromApp.APP_FEATURE_KEY, fromApp.reducer),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [AppFacade],
})
export class UserInterfaceModule {}
