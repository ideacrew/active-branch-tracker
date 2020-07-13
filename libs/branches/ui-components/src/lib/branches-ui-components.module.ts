import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchContainerComponent } from './branch-container/branch-container.component';
import { ReleaseDateComponent } from './release-date/release-date.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BranchContainerComponent, ReleaseDateComponent],
  exports: [BranchContainerComponent, ReleaseDateComponent],
})
export class BranchesUiComponentsModule {}
