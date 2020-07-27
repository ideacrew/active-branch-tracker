import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchContainerComponent } from './branch-container/branch-container.component';
import { ReleaseDateComponent } from './release-date/release-date.component';
import { DataTransformModule } from './data-transform/data-transform.module';

@NgModule({
  imports: [CommonModule, DataTransformModule],
  declarations: [BranchContainerComponent, ReleaseDateComponent],
  exports: [BranchContainerComponent, ReleaseDateComponent],
})
export class BranchesUiComponentsModule {}
