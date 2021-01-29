import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CheckSuiteConclusion, ReleaseDateInfo, BranchStatus } from '@idc/util';

import { BranchesEntity } from '@idc/branches/data-access';
import { DisplayType } from '@idc/display-config';

@Component({
  selector: 'idc-branch-container',
  templateUrl: './branch-container.component.html',
  styleUrls: ['./branch-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchContainerComponent {
  CheckSuiteConclusion = CheckSuiteConclusion;
  DisplayType = DisplayType;

  @Input() branch: BranchesEntity;
  @Input() viewType: 'expanded' | 'collapsed' = 'expanded';
  @Input() loggedIn: boolean;

  @Output() readonly trackBranch = new EventEmitter<BranchesEntity>();
  @Output() readonly untrackBranch = new EventEmitter<BranchesEntity>();
  @Output() readonly newReleaseDate = new EventEmitter<ReleaseDateInfo>();
  @Output() readonly changeStatus = new EventEmitter<{
    branchId: string | number;
    status: BranchStatus;
  }>();

  changeReleaseDate(event: string): void {
    const info: ReleaseDateInfo = {
      branch: this.branch,
      releaseDate: new Date(event),
    };
    this.newReleaseDate.emit(info);
  }

  changeBranchStatus(status: BranchStatus): void {
    this.changeStatus.emit({ branchId: this.branch.id, status });
  }
}
