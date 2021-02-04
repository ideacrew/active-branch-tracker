import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EnvironmentsService } from '@idc/environments/data-access';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: './environment-detail.component.html',
  styleUrls: ['./environment-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentDetailComponent implements OnInit {
  orgId = '';
  envId = '';

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

  environmentDetail$ = this.orgEnvIds$.pipe(
    switchMap(({ orgId, envId }) =>
      this.envService.getEnvironmentDetail({ orgId, envId }),
    ),
  );

  constructor(
    private route: ActivatedRoute,
    private envService: EnvironmentsService,
  ) {}

  ngOnInit(): void {}
}
