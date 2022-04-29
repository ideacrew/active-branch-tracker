import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './open-pull-requests.component.html',
  styleUrls: ['./open-pull-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenPullRequestsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
