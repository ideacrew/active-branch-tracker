import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchDetailComponent } from './branch-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BranchDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BranchDetailComponent }]),
  ],
})
export class BranchDetailModule {}
