import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchLinkPipe } from './branch-link.pipe';
import { IsOldPipe } from './is-old.pipe';

@NgModule({
  declarations: [BranchLinkPipe, IsOldPipe],
  imports: [CommonModule],
  exports: [BranchLinkPipe, IsOldPipe],
})
export class DataTransformModule {}
