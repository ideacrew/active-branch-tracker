import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  EnvironmentsService,
  OrgEnvironment,
} from '@idc/environments/data-access';
import { UserService } from '@idc/user/data-access';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { convertDateInputToLocalDate } from '../convertDate';

@Component({
  templateUrl: './environment-detail.component.html',
  styleUrls: ['./environment-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentDetailComponent {
  orgId = '';
  envId = '';
  changingOwnership = false;
  newOwner = '';
  newReleaseDate = '';
  isAdmin = this.userService.isAdmin.value;

  orgEnvIds$ = this.route.paramMap.pipe(
    filter((params: ParamMap) => params.has('orgId') && params.has('envId')),
    map((params: ParamMap) => ({
      orgId: params.get('orgId'),
      envId: params.get('envId'),
    })),
    tap(({ orgId, envId }) => {
      this.orgId = orgId;
      this.envId = envId;
    }),
  );

  orgName$ = this.orgEnvIds$.pipe(
    switchMap(({ orgId }) => this.envService.getOrgName(orgId)),
  );

  environmentDetail$ = this.orgEnvIds$.pipe(
    switchMap(({ orgId, envId }) =>
      this.envService.getEnvironmentDetail({ orgId, envId }),
    ),
    tap((env: OrgEnvironment) => {
      this.newOwner = env.owner;
      this.newReleaseDate = env.ownerRelease
        ?.toDate()
        .toISOString()
        .slice(0, 10);
    }),
  );

  @HostBinding('class.is-admin') get isAnAdmin(): boolean {
    return this.isAdmin;
  }

  constructor(
    private route: ActivatedRoute,
    private envService: EnvironmentsService,
    private userService: UserService,
  ) {}

  async updateOwnership(): Promise<void> {
    const owner = this.newOwner.trim() === '' ? 'Open' : this.newOwner;
    const releaseDate =
      this.newReleaseDate === undefined || this.newReleaseDate.trim() === ''
        ? convertDateInputToLocalDate('2030-01-01')
        : convertDateInputToLocalDate(this.newReleaseDate);

    await this.envService.updateOwnerInformation({
      orgId: this.orgId,
      envId: this.envId,
      owner,
      ownerRelease: releaseDate,
    });

    this.changingOwnership = false;
  }
}
