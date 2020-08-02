import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BranchListService } from './branch-list.service';
import * as fromBranches from './store/branches.reducer';
import { BranchesEffects } from './store/branches.effects';
import { BranchesFacade } from './store/branches.facade';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule,
    StoreModule.forFeature(
      fromBranches.BRANCHES_FEATURE_KEY,
      fromBranches.reducer,
    ),
    EffectsModule.forFeature([BranchesEffects]),
  ],
  providers: [BranchListService, BranchesFacade],
})
export class BranchesDataAccessModule {}
