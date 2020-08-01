import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEnvironments from './store/environments.reducer';
import { EnvironmentsEffects } from './store/environments.effects';
import { EnvironmentsFacade } from './store/environments.facade';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule,
    StoreModule.forFeature(
      fromEnvironments.ENVIRONMENTS_FEATURE_KEY,
      fromEnvironments.reducer,
    ),
    EffectsModule.forFeature([EnvironmentsEffects]),
  ],
  providers: [EnvironmentsFacade],
})
export class BranchesDataAccessModule {}
