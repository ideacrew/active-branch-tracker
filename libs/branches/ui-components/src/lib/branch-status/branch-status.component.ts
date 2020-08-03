import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { BranchStatus } from '@idc/util';

@Component({
  selector: 'idc-branch-status',
  templateUrl: './branch-status.component.html',
  styleUrls: ['./branch-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchStatusComponent {
  BranchStatus = BranchStatus;
  editing = false;
  statusNames: BranchStatus[] = [
    BranchStatus.Development,
    BranchStatus.Review,
    BranchStatus.Accepted,
  ];

  @Input() currentStatus: BranchStatus;
  @Output() readonly newStatus = new EventEmitter<BranchStatus>();

  @HostListener('mouseenter')
  onEnter(): void {
    this.editing = true;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.editing = false;
  }

  changeStatus(status: BranchStatus): void {
    this.newStatus.emit(status);
  }
}
