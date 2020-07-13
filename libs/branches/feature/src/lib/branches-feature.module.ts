import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BranchesUiComponentsModule } from '@idc/branches/ui-components';
import { ActiveBranchesComponent } from './active-branches/active-branches.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ActiveBranchesComponent }]),
    BranchesUiComponentsModule,
  ],
  declarations: [ActiveBranchesComponent],
  exports: [ActiveBranchesComponent],
})
export class BranchesFeatureModule {}
