import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EnvironmentsService } from '@idc/environments/data-access';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'idc-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewServiceComponent {
  orgId!: string;
  envId!: string;
  serviceName = '';
  serviceUrl = '';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private envService: EnvironmentsService,
  ) {}

  async addNewService(): Promise<void> {
    const envInfo = {
      orgId: this.orgId,
      envId: this.envId,
    };

    const serviceInfo = {
      name: this.serviceName,
      url: this.serviceUrl,
    };

    await this.envService.addService(envInfo, serviceInfo);
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
