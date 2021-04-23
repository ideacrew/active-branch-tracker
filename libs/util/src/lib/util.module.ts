import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitLinkPipe } from './commit-link.pipe';
import { PrLinkPipe } from './pr-link.pipe';
import { FailurePercentPipe } from './failure-percent.pipe';
import { IsOldPipe } from './is-old.pipe';
import { BranchLinkPipe } from './branch-link.pipe';
import { ActionsLinkPipe } from './actions-link.pipe';
import { PrLinkPipeFromPR } from './pr-link-from-pr.pipe';
import { RelativeDatePipe } from './relative-date.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CommitLinkPipe,
    PrLinkPipe,
    PrLinkPipeFromPR,
    FailurePercentPipe,
    IsOldPipe,
    BranchLinkPipe,
    ActionsLinkPipe,
    RelativeDatePipe,
  ],
  exports: [
    CommitLinkPipe,
    PrLinkPipe,
    PrLinkPipeFromPR,
    FailurePercentPipe,
    IsOldPipe,
    BranchLinkPipe,
    ActionsLinkPipe,
    RelativeDatePipe,
  ],
})
export class UtilModule {}
