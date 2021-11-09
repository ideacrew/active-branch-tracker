import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitLinkPipe } from './commit-link.pipe';
import { PrLinkPipe } from './pr-link.pipe';
import { FailurePercentPipe } from './failure-percent.pipe';
import { IsOldPipe } from './is-old.pipe';
import { BranchLinkPipe } from './branch-link.pipe';
import { ActionsLinkPipe } from './actions-link.pipe';
import { RelativeDatePipe } from './relative-date.pipe';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { TimeLeftPipe } from './time-left.pipe';
import { DaysLeftPipe } from './days-left.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CommitLinkPipe,
    PrLinkPipe,
    FailurePercentPipe,
    IsOldPipe,
    BranchLinkPipe,
    ActionsLinkPipe,
    RelativeDatePipe,
    FirestoreDatePipe,
    TimeLeftPipe,
    DaysLeftPipe,
  ],
  exports: [
    CommitLinkPipe,
    PrLinkPipe,
    FailurePercentPipe,
    IsOldPipe,
    BranchLinkPipe,
    ActionsLinkPipe,
    RelativeDatePipe,
    FirestoreDatePipe,
    TimeLeftPipe,
    DaysLeftPipe,
  ],
})
export class UtilModule {}
