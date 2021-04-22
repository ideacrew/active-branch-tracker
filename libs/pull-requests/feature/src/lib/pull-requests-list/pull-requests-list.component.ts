import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'idc-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PullRequestsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
