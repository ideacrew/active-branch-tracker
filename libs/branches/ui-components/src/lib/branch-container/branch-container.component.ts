import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CheckSuiteConclusion, ReleaseDateInfo } from '@idc/util';

import { BranchesEntity } from '@idc/branches/data-access';

@Component({
  selector: 'idc-branch-container',
  templateUrl: './branch-container.component.html',
  styleUrls: ['./branch-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchContainerComponent {
  CheckSuiteConclusion = CheckSuiteConclusion;

  @Input() branch: BranchesEntity;
  @Input() viewType: 'expanded' | 'collapsed' = 'expanded';

  @Output() readonly trackBranch = new EventEmitter<BranchesEntity>();
  @Output() readonly untrackBranch = new EventEmitter<BranchesEntity>();
  @Output() readonly newReleaseDate = new EventEmitter<ReleaseDateInfo>();

  changeReleaseDate(event: string): void {
    const info: ReleaseDateInfo = {
      branch: this.branch,
      releaseDate: new Date(event),
    };
    this.newReleaseDate.emit(info);
  }
}
