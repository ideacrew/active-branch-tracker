import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '@idc/user/data-access';

@Component({
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgListComponent {
  constructor(public user: UserService) {}
}
