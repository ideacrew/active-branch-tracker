import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EnvironmentsService, Org } from '@idc/environments/data-access';
import { UserService } from '@idc/user/data-access';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgListComponent {
  orgList$: Observable<Org[]> = this.userService.user$.pipe(
    switchMap(user => this.envService.getOrgList(user)),
  );

  constructor(
    public userService: UserService,
    public envService: EnvironmentsService,
  ) {}

  trackByOrgId(index: number, org: Org): string {
    return `${org.id}-${org.name}`;
  }
}
