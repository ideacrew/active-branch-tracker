import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDisplayConfig from './store/display-config.reducer';
import { DisplayConfigEffects } from './store/display-config.effects';
import { DisplayConfigFacade } from './store/display-config.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDisplayConfig.DISPLAYCONFIG_FEATURE_KEY,
      fromDisplayConfig.reducer,
    ),
    EffectsModule.forFeature([DisplayConfigEffects]),
  ],
  providers: [DisplayConfigFacade],
})
export class DisplayConfigModule {}
