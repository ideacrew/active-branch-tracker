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

  @Input() currentStatus: BranchStatus;
  @Output() readonly newStatus = new EventEmitter<BranchStatus>();

  @HostListener('mouseenter')
  onEnter(): void {
    if (this.editing.value === false) {
      setTimeout(() => {
        console.log('Setting editing to true');
        this.editing.next(true);
      }, 250);
    }
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.editing.next(false);
  }

  changeStatus(status: BranchStatus): void {
    this.editing.next(false);
    this.newStatus.emit(status);
  }
}
