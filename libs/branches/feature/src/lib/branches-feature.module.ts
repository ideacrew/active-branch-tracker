import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BranchesUiComponentsModule } from '@idc/branches/ui-components';

import { ActiveBranchesComponent } from './active-branches/active-branches.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ActiveBranchesComponent }]),
    BranchesUiComponentsModule,
  ],
  declarations: [ActiveBranchesComponent],
})
export class BranchesFeatureModule {}
