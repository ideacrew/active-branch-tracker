import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { BranchInfo, FSWorkflowRun } from '@idc/util';
import { DisplayType } from '@idc/display-config';

@Component({
  selector: 'idc-branch-container',
  templateUrl: './branch-container.component.html',
  styleUrls: ['./branch-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchContainerComponent {
  @Input() branch!: BranchInfo;
  @Input() viewType: DisplayType = 'expanded';
  @Input() loggedIn = false;

  @Output() readonly trackBranch = new EventEmitter<BranchInfo>();
  @Output() readonly untrackBranch = new EventEmitter<BranchInfo>();

  trackByRunId(index: number, workflowResult: FSWorkflowRun): number {
    return workflowResult.runId;
  }
}
