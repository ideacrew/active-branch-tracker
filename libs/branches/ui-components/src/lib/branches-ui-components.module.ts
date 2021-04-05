import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilModule } from '@idc/util';

import { BranchContainerComponent } from './branch-container/branch-container.component';
import { ReleaseDateComponent } from './release-date/release-date.component';

@NgModule({
  imports: [CommonModule, UtilModule],
  declarations: [BranchContainerComponent, ReleaseDateComponent],
  exports: [BranchContainerComponent, ReleaseDateComponent],
})
export class BranchesUiComponentsModule {}
