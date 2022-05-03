import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PullRequestListService } from './pull-request-list.service';

@NgModule({
  imports: [CommonModule],
  providers: [PullRequestListService],
})
export class PullRequestsDataAccessModule {}
