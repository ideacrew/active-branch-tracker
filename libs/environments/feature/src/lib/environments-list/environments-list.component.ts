import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  EnvironmentsService,
  OrgEnvironment,
} from '@idc/environments/data-access';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  templateUrl: './environments-list.component.html',
  styleUrls: ['./environments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentsListComponent {
  orgId = '';
  refreshing = new BehaviorSubject<boolean>(false);
  refreshing$ = this.refreshing.asObservable();

  orgId$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('orgId')),
    map((parameters: ParamMap) => parameters.get('orgId') ?? ''),
    tap((orgId: string) => (this.orgId = orgId)),
  );

  orgName$ = this.orgId$.pipe(
    switchMap(orgId => this.environmentService.getOrgName(orgId)),
  );

  allEnvironments$ = this.orgId$.pipe(
    switchMap(orgName =>
      this.environmentService.queryEnvironmentsByOrg(orgName).pipe(
        catchError(error => {
          console.error('ERROR LOADING ENVIRONMENTS', error);
          return EMPTY;
        }),
      ),
    ),
    // allows other subscriptions to share what
    // allEnvironments$ provides
    shareReplay(),
  );

  prodLike$: Observable<{
    e2e: OrgEnvironment[];
    standalone: OrgEnvironment[];
  }> = this.allEnvironments$.pipe(
    map(environments =>
      environments.filter(environment => environment.prodlike === true),
    ),
    map(productionLikeEnvironments => {
      // eslint-disable-next-line unicorn/prevent-abbreviations
      const e2e = productionLikeEnvironments.filter(
        environment => environment.architecture === 'e2e',
      );
      const standalone = productionLikeEnvironments.filter(
        environment => environment.architecture === 'standalone',
      );

      return { e2e, standalone };
    }),
  );

  nonProd$ = this.allEnvironments$.pipe(
    map(environments =>
      environments.filter(environment => environment.prodlike === false),
    ),
  );

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentsService,
  ) {}

  trackByEnvironmentName(index: number, environment: OrgEnvironment): string {
    return `${environment.id}-${environment.name}`;
  }
}
