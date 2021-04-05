import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilModule } from '@idc/util';

import { BranchContainerComponent } from './branch-container/branch-container.component';

@NgModule({
  imports: [CommonModule, UtilModule],
  declarations: [BranchContainerComponent],
  exports: [BranchContainerComponent],
})
export class BranchesUiComponentsModule {}
