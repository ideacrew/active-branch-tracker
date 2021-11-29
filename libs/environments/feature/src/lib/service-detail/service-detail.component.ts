import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';

import {
  EnvironmentsService,
  ServiceInfo,
} from '@idc/environments/data-access';
import { filterNullish } from '@idc/util';

@Component({
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  private serviceInfo = new BehaviorSubject<ServiceInfo | null>(null);
  serviceInfo$ = this.serviceInfo.asObservable();

  urlParams$ = this.route.paramMap.pipe(
    map((params: ParamMap) => ({
      orgId: params.get('orgId') ?? 'no-org-id',
      envId: params.get('envId') ?? 'no-env-id',
      serviceId: params.get('serviceId') ?? 'no-service-id',
    })),
    tap((serviceInfo: ServiceInfo) => this.serviceInfo.next(serviceInfo)),
  );

  orgName$ = this.serviceInfo$.pipe(
    filterNullish(),
    switchMap(({ orgId }) => this.envService.getOrgName(orgId)),
  );

  envName$ = this.serviceInfo$.pipe(
    filterNullish(),
    switchMap(({ orgId, envId }) =>
      this.envService.getEnvironmentDetail({ orgId, envId }),
    ),
    filterNullish(),
    map(({ name }) => name),
  );

  service$ = this.urlParams$.pipe(
    switchMap(({ orgId, envId, serviceId }: ServiceInfo) =>
      this.envService.getService({ orgId, envId, serviceId }),
    ),
  );

  vm$ = combineLatest({
    orgName: this.orgName$,
    serviceInfo: this.serviceInfo$,
    service: this.service$,
    envName: this.envName$,
  });

  constructor(
    private route: ActivatedRoute,
    private envService: EnvironmentsService,
  ) {}

  async updateServiceInfo({
    name,
    url,
  }: {
    name: string;
    url: string;
  }): Promise<void> {
    const serviceInfo = this.serviceInfo.value ?? {
      orgId: 'no-org-id',
      serviceId: 'no-service-id',
      envId: 'no-env-id',
    };

    await this.envService.updateService(serviceInfo, {
      name,
      url,
    });
  }
}
