import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitLinkPipe } from './commit-link.pipe';
import { PrLinkPipe } from './pr-link.pipe';
import { FailurePercentPipe } from './failure-percent.pipe';
import { IsOldPipe } from './is-old.pipe';
import { BranchLinkPipe } from './branch-link.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CommitLinkPipe,
    PrLinkPipe,
    FailurePercentPipe,
    IsOldPipe,
    BranchLinkPipe,
  ],
  exports: [
    CommitLinkPipe,
    PrLinkPipe,
    FailurePercentPipe,
    IsOldPipe,
    BranchLinkPipe,
  ],
})
export class UtilModule {}
