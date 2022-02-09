import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilModule, WorkflowStatusPipeModule } from '@idc/util';

import { BranchContainerComponent } from './branch-container/branch-container.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [CommonModule, UtilModule, WorkflowStatusPipeModule],
  declarations: [BranchContainerComponent, LoadingSpinnerComponent],
  exports: [BranchContainerComponent],
})
export class BranchesUiComponentsModule {}
