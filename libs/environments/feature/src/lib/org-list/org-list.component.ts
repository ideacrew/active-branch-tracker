import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EnvironmentsService, Org } from '@idc/environments/data-access';
import { UserService } from '@idc/user/data-access';

@Component({
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgListComponent {
  orgList$: Observable<Org[]> = this.userService.user$.pipe(
    switchMap(user =>
      user === undefined
        ? of([] as Org[])
        : this.environmentService.getOrgList(user),
    ),
  );

  constructor(
    public userService: UserService,
    public environmentService: EnvironmentsService,
  ) {}

  trackByOrgId(index: number, org: Org): string {
    return `${org.id}-${org.name}`;
  }
}
