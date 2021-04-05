import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ReleaseDateInfo, BranchInfo } from '@idc/util';
import { DisplayType } from '@idc/display-config';

@Component({
  selector: 'idc-branch-container',
  templateUrl: './branch-container.component.html',
  styleUrls: ['./branch-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchContainerComponent {
  @Input() branch: BranchInfo;
  @Input() viewType: DisplayType = 'expanded';
  @Input() loggedIn: boolean;

  @Output() readonly trackBranch = new EventEmitter<BranchInfo>();
  @Output() readonly untrackBranch = new EventEmitter<BranchInfo>();
  @Output() readonly newReleaseDate = new EventEmitter<ReleaseDateInfo>();

  changeReleaseDate(event: string): void {
    const info: ReleaseDateInfo = {
      branch: this.branch,
      releaseDate: new Date(event),
    };
    this.newReleaseDate.emit(info);
  }
}
