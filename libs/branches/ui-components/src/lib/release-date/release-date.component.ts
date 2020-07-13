import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { convertReleaseDate } from '../convertReleaseDate';

@Component({
  selector: 'idc-release-date',
  templateUrl: './release-date.component.html',
  styleUrls: ['./release-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseDateComponent {
  editingReleaseDate = false;

  @Input() releaseDate: number;

  @Output() readonly newReleaseDate = new EventEmitter<Date>();

  emitReleaseDate(date: string): void {
    this.editingReleaseDate = false;
    this.newReleaseDate.emit(convertReleaseDate(date));
  }
}
