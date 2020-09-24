import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'idc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  constructor(public auth: AuthService) {}
}
