import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  CheckSuiteConclusion,
  ReleaseDateInfo,
} from '@idc/branches/data-access';
import { BranchInfoVM } from '@idc/util';

@Component({
  selector: 'idc-branch-container',
  templateUrl: './branch-container.component.html',
  styleUrls: ['./branch-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchContainerComponent {
  CheckSuiteConclusion = CheckSuiteConclusion;

  @Input() branch: BranchInfoVM;
  @Input() viewType: 'expanded' | 'collapsed' = 'expanded';

  @Output() readonly trackBranch = new EventEmitter<BranchInfoVM>();
  @Output() readonly untrackBranch = new EventEmitter<BranchInfoVM>();
  @Output() readonly newReleaseDate = new EventEmitter<ReleaseDateInfo>();

  changeReleaseDate(event: string): void {
    const info: ReleaseDateInfo = {
      branch: this.branch,
      releaseDate: new Date(event),
    };
    this.newReleaseDate.emit(info);
  }
}
