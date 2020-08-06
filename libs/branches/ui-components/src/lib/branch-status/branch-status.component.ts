import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { BranchStatus } from '@idc/util';

@Component({
  selector: 'idc-branch-status',
  templateUrl: './branch-status.component.html',
  styleUrls: ['./branch-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchStatusComponent {
  editing = false;

  BranchStatus = BranchStatus;
  statusNames: BranchStatus[] = [
    BranchStatus.Development,
    BranchStatus.Review,
    BranchStatus.Accepted,
    BranchStatus.OnHold,
  ];

  @Input() currentStatus: BranchStatus;
  @Output() readonly newStatus = new EventEmitter<BranchStatus>();

  changeStatus(status: BranchStatus): void {
    this.editing = false;
    this.newStatus.emit(status);
  }
}
