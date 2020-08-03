import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { BranchStatus } from '@idc/util';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'idc-branch-status',
  templateUrl: './branch-status.component.html',
  styleUrls: ['./branch-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchStatusComponent {
  BranchStatus = BranchStatus;
  editing = new BehaviorSubject<boolean>(false);
  editing$ = this.editing.asObservable();
  statusNames: BranchStatus[] = [
    BranchStatus.Development,
    BranchStatus.Review,
    BranchStatus.Accepted,
  ];

  mouseInHost = false;

  @Input() currentStatus: BranchStatus;
  @Output() readonly newStatus = new EventEmitter<BranchStatus>();

  @HostListener('mouseenter')
  onEnter(): void {
    this.mouseInHost = true;
    if (this.editing.value === false) {
      setTimeout(() => {
        if (this.mouseInHost) {
          this.editing.next(true);
        }
      }, 350);
    }
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.mouseInHost = false;
    this.editing.next(false);
  }

  changeStatus(status: BranchStatus): void {
    this.editing.next(false);
    this.newStatus.emit(status);
  }
}
