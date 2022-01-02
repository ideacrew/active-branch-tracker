import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { addWeeks } from 'date-fns';

import {
  OrgEnvironment,
  OwnerReleaseUpdate,
  OwnerUpdate,
} from '@idc/environments/data-access';
import { convertDateInputToLocalDate } from '../convert-date';
import { UserService } from '@idc/user/data-access';

@Component({
  selector: 'idc-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrls: ['./environment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentCardComponent {
  editingOwnership = false;
  currentOwner = '';
  editingOwnerReleaseDate = false;
  currentReleaseDate = '';

  isAdmin = this.userService.isAdmin.value;

  @Input() org = '';
  @Input() environment!: OrgEnvironment;
  @Output() readonly newOwner = new EventEmitter<Partial<OwnerUpdate>>();
  @Output() readonly newOwnerRelease = new EventEmitter<
    Partial<OwnerReleaseUpdate>
  >();

  constructor(private userService: UserService) {}

  // @HostBinding('class.is-reachable') get isReachable(): boolean {
  //   return this.environment.reachable === undefined
  //     ? true
  //     : this.environment.reachable;
  // }

  @HostBinding('class.is-admin') get isAnAdmin(): boolean {
    return this.isAdmin;
  }

  editOwnership(): void {
    if (this.isAdmin) {
      this.currentOwner = this.environment.owner;
      this.editingOwnership = true;
    }
  }

  editOwnerReleaseDate(): void {
    if (this.isAdmin) {
      this.editingOwnerReleaseDate = true;
      const nextWeek = addWeeks(new Date(), 1);
      this.currentReleaseDate = nextWeek.toISOString().slice(0, 10);
    }
  }

  cancelEditingOwnership(): void {
    this.editingOwnership = false;
  }

  cancelEditingOwnershipReleaseDate(): void {
    this.editingOwnerReleaseDate = false;
  }

  updateOwnership(): void {
    this.editingOwnership = false;
    this.newOwner.emit({
      envId: this.environment.id,
      owner: this.currentOwner,
    });
  }

  updateOwnershipRelease(): void {
    const newDate = convertDateInputToLocalDate(this.currentReleaseDate);

    this.newOwnerRelease.emit({
      envId: this.environment.id,
      ownerRelease: newDate,
    });
  }
}
