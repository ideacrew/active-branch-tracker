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
    switchMap(user => {
      if (user !== undefined) {
        return this.envService.getOrgList(user);
      } else {
        return of([] as Org[]);
      }
    }),
  );

  constructor(
    public userService: UserService,
    public envService: EnvironmentsService,
  ) {}

  trackByOrgId(index: number, org: Org): string {
    return `${org.id}-${org.name}`;
  }
}
