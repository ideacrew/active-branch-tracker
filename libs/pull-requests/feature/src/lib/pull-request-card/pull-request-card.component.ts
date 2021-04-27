import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';

import { PullRequest } from '@idc/pull-requests/data-access';

@Component({
  selector: 'idc-pull-request-card',
  templateUrl: './pull-request-card.component.html',
  styleUrls: ['./pull-request-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PullRequestCardComponent {
  @Input() pullRequest!: PullRequest;

  @HostBinding('class') class = 'card';
}
