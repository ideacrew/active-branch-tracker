import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilModule } from '@idc/util';

import { BranchContainerComponent } from './branch-container/branch-container.component';
import { ReleaseDateComponent } from './release-date/release-date.component';
import { BranchStatusComponent } from './branch-status/branch-status.component';

@NgModule({
  imports: [CommonModule, UtilModule],
  declarations: [BranchContainerComponent, ReleaseDateComponent, BranchStatusComponent],
  exports: [BranchContainerComponent, ReleaseDateComponent, BranchStatusComponent],
})
export class BranchesUiComponentsModule {}
