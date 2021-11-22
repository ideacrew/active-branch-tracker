import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  EnvironmentsService,
  OrgEnvironment,
  EnvironmentService,
} from '@idc/environments/data-access';
import { UserService } from '@idc/user/data-access';
import { filterNullish } from '@idc/util';

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
      orgId: params.get('orgId') ?? 'no-org-id',
      envId: params.get('envId') ?? 'no-env-id',
    })),
    tap(({ orgId, envId }) => {
      this.orgId = orgId;
      this.envId = envId;
    }),
  );

  orgName$ = this.orgEnvIds$.pipe(
    switchMap(({ orgId }) => this.envService.getOrgName(orgId)),
  );

  environmentDetail$: Observable<OrgEnvironment> = this.orgEnvIds$.pipe(
    switchMap(({ orgId, envId }) =>
      this.envService.getEnvironmentDetail({ orgId, envId }).pipe(
        filterNullish(),
        tap(env => {
          this.newOwner = env.owner;
          this.newReleaseDate = env.ownerRelease
            ?.toDate()
            .toISOString()
            .slice(0, 10);
        }),
      ),
    ),
  );

  services$: Observable<EnvironmentService[]> = this.orgEnvIds$.pipe(
    switchMap(({ orgId, envId }) =>
      this.envService.getServices({ orgId, envId }),
    ),
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

  trackByServiceName(index: number, service: EnvironmentService): string {
    return `${service.name}`;
  }
}
