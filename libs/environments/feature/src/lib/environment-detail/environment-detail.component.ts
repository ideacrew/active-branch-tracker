import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, shareReplay } from 'rxjs/operators';

import {
  EnvironmentsService,
  OrgEnvironment,
  EnvironmentService,
  EnvironmentVariable,
} from '@idc/environments/data-access';
import { UserService } from '@idc/user/data-access';
import { filterNullish } from '@idc/util';

import { convertDateInputToLocalDate } from '../convert-date';

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
    filter(
      (parameters: ParamMap) =>
        parameters.has('orgId') && parameters.has('envId'),
    ),
    map((parameters: ParamMap) => ({
      orgId: parameters.get('orgId') ?? 'no-org-id',
      envId: parameters.get('envId') ?? 'no-env-id',
    })),
    tap(({ orgId, envId }) => {
      this.orgId = orgId;
      this.envId = envId;
    }),
    shareReplay(),
  );

  orgName$ = this.orgEnvIds$.pipe(
    switchMap(({ orgId }) => this.environmentService.getOrgName(orgId)),
  );

  environmentDetail$: Observable<OrgEnvironment> = this.orgEnvIds$.pipe(
    switchMap(({ orgId, envId }) =>
      this.environmentService.getEnvironmentDetail({ orgId, envId }).pipe(
        filterNullish(),
        tap(environment => {
          this.newOwner = environment.owner;
          this.newReleaseDate = environment.ownerRelease
            ?.toDate()
            .toISOString()
            .slice(0, 10);
        }),
      ),
    ),
  );

  environmentVariables$: Observable<EnvironmentVariable[]> =
    this.orgEnvIds$.pipe(
      switchMap(({ orgId, envId }) =>
        this.environmentService.getEnvironmentVariables({ orgId, envId }),
      ),
    );

  services$: Observable<EnvironmentService[]> = this.orgEnvIds$.pipe(
    switchMap(({ orgId, envId }) =>
      this.environmentService.getServices({ orgId, envId }),
    ),
  );

  @HostBinding('class.is-admin') get isAnAdmin(): boolean {
    return this.isAdmin;
  }

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentsService,
    private userService: UserService,
  ) {}

  async updateOwnership(): Promise<void> {
    const owner = this.newOwner.trim() === '' ? 'Open' : this.newOwner;
    const releaseDate =
      this.newReleaseDate === undefined || this.newReleaseDate.trim() === ''
        ? convertDateInputToLocalDate('2030-01-01')
        : convertDateInputToLocalDate(this.newReleaseDate);

    await this.environmentService.updateOwnerInformation({
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
