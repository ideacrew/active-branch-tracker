import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { addWeeks } from 'date-fns';

import {
  OrgEnvironment,
  OwnerReleaseUpdate,
  OwnerUpdate,
} from '@idc/environments/data-access';
import { convertDateInputToLocalDate } from '../convertDate';

@Component({
  selector: 'idc-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrls: ['./environment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentCardComponent {
  editingOwnership = false;
  currentOwner: string;
  editingOwnerReleaseDate = false;
  currentReleaseDate: string;

  @Input() org: string;
  @Input() environment: OrgEnvironment;
  @Output() readonly newOwner = new EventEmitter<Partial<OwnerUpdate>>();
  @Output() readonly newOwnerRelease = new EventEmitter<
    Partial<OwnerReleaseUpdate>
  >();

  editOwnership(): void {
    this.currentOwner = this.environment.owner;
    this.editingOwnership = true;
  }

  editOwnerReleaseDate(): void {
    this.editingOwnerReleaseDate = true;
    const nextWeek = addWeeks(new Date(), 1);
    this.currentReleaseDate = nextWeek.toISOString().slice(0, 10);
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
