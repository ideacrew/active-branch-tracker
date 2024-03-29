import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

import {
  EnvironmentsService,
  EnvironmentVariableDict,
  FSServiceDeployment,
  ServiceInfo,
} from '@idc/environments/data-access';

@Component({
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  service: ServiceInfo | undefined = undefined;

  urlParams$ = this.route.paramMap.pipe(
    map(
      (parameters: ParamMap): ServiceInfo => ({
        orgId: parameters.get('orgId') ?? 'no-org-id',
        envId: parameters.get('envId') ?? 'no-env-id',
        serviceId: parameters.get('serviceId') ?? 'no-service-id',
      }),
    ),
    tap(serviceInfo => (this.service = serviceInfo)),
    shareReplay(),
  );

  orgName$ = this.urlParams$.pipe(
    switchMap(serviceInfo =>
      serviceInfo === null
        ? of(EMPTY)
        : this.environmentService.getOrgName(serviceInfo.orgId),
    ),
  );

  envName$ = this.urlParams$.pipe(
    switchMap(({ orgId, envId }) =>
      this.environmentService.getEnvironmentDetail({ orgId, envId }),
    ),
    filter(Boolean),
    map(({ name }) => name),
  );

  service$ = this.urlParams$.pipe(
    switchMap(({ orgId, envId, serviceId }: ServiceInfo) =>
      this.environmentService.getService({ orgId, envId, serviceId }),
    ),
  );

  deployments$ = this.urlParams$.pipe(
    switchMap(urlParameters =>
      this.environmentService.getDeploymentHistory(urlParameters),
    ),
  );

  environmentVariables$: Observable<EnvironmentVariableDict> =
    this.urlParams$.pipe(
      switchMap(({ orgId, envId, serviceId }) =>
        this.environmentService.getServiceVariables({
          orgId,
          envId,
          serviceId,
        }),
      ),
    );

  vm$ = combineLatest({
    orgName: this.orgName$,
    service: this.service$,
    envName: this.envName$,
    deployments: this.deployments$,
  });

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentsService,
  ) {}

  async updateServiceInfo({
    name,
    url,
  }: {
    name: string;
    url: string;
  }): Promise<void> {
    const serviceInfo = this.service ?? {
      orgId: 'no-org-id',
      serviceId: 'no-service-id',
      envId: 'no-env-id',
    };

    await this.environmentService.updateService(serviceInfo, {
      name,
      url,
    });
  }

  trackById(index: number, deployment: FSServiceDeployment): string {
    return deployment.id;
  }

  trackByVarName(index: number): number {
    return index;
  }
}
