import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EnvironmentsFacade } from '@idc/environments/data-access';

@Component({
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentsComponent implements OnInit {
  constructor(public environmentsFacade: EnvironmentsFacade) {}

  ngOnInit(): void {}
}
