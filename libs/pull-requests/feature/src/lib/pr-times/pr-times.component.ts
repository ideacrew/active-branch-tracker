import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
} from '@angular/core';
import * as c3 from 'c3';

import { PullRequestsByMergeTime } from '../util';

@Component({
  selector: 'idc-pr-times',
  templateUrl: './pr-times.component.html',
  styleUrls: ['./pr-times.component.scss'],
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrTimesComponent implements OnChanges {
  @Input() prs!: PullRequestsByMergeTime[] | null;

  get mergeTime(): string[] {
    return (
      this.prs?.map(pr => pr.timeToMergeInDays).map(time => time.toString()) ||
      []
    );
  }

  get prQuantity(): number[] {
    return this.prs?.map(pr => pr.quantity) || [];
  }

  ngOnChanges(): void {
    if (this.prs !== undefined) {
      this.generateSvg();
    }
  }

  generateSvg(): void {
    // Bar chart config from C3
    const config: c3.ChartConfiguration = {
      bindto: '#chart-3',
      data: {
        columns: [['prs', ...this.prQuantity]],
        type: 'bar',
        colors: {
          prs: 'var(--green-050)',
        },
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
      axis: {
        y: {
          type: 'linear',
        },
        x: {
          type: 'category',
          categories: [...this.mergeTime],
        },
      },
      legend: {
        show: false,
      },
    };

    c3.generate(config);
  }
}
