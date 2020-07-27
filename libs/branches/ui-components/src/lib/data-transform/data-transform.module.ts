import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchLinkPipe } from './branch-link.pipe';



@NgModule({
  declarations: [BranchLinkPipe],
  imports: [
    CommonModule
  ],
  exports: [BranchLinkPipe]
})
export class DataTransformModule { }
