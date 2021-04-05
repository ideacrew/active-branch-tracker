import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  EnvironmentsService,
  OrgEnvironment,
  OwnerReleaseUpdate,
  OwnerUpdate,
} from '@idc/environments/data-access';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './environments-list.component.html',
  styleUrls: ['./environments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentsListComponent {
  orgId = '';

  orgId$ = this.route.paramMap.pipe(
    filter((params: ParamMap) => params.has('orgId')),
    map((params: ParamMap) => params.get('orgId')),
    tap(orgId => (this.orgId = orgId)),
  );

  orgName$ = this.orgId$.pipe(
    switchMap(orgId => this.envService.getOrgName(orgId)),
  );

  allEnvironments$ = this.orgId$.pipe(
    switchMap(orgName =>
      this.envService.queryEnvironmentsByOrg(orgName).pipe(
        catchError(e => {
          console.error('ERROR LOADING ENVIRONMENTS', e);
          return EMPTY;
        }),
      ),
    ),
  );

  prodLike$: Observable<{
    e2e: OrgEnvironment[];
    standalone: OrgEnvironment[];
  }> = this.allEnvironments$.pipe(
    map(environments => environments.filter(env => env.prodlike === true)),
    map(prodLikeEnvs => {
      const e2e = prodLikeEnvs.filter(env => env.architecture === 'e2e');
      const standalone = prodLikeEnvs.filter(
        env => env.architecture === 'standalone',
      );

      return { e2e, standalone };
    }),
  );

  nonProd$ = this.allEnvironments$.pipe(
    map(environments => environments.filter(env => env.prodlike === false)),
  );

  constructor(
    private route: ActivatedRoute,
    private envService: EnvironmentsService,
  ) {}

  async updateOwner({ envId, owner }: Partial<OwnerUpdate>): Promise<void> {
    await this.envService.updateEnvironmentOwner({
      orgId: this.orgId,
      envId,
      owner,
    });
  }

  async updateRelease({
    envId,
    ownerRelease,
  }: Partial<OwnerReleaseUpdate>): Promise<void> {
    console.log('Updating to', ownerRelease);

    await this.envService.updateEnvironmentReleaseDate({
      orgId: this.orgId,
      envId,
      ownerRelease,
    });
  }

  trackByEnvironmentName(index: number, env: OrgEnvironment): string {
    return `${env.id}-${env.name}`;
  }
}
