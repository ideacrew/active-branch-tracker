import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
} from '@angular/core';
import * as c3 from 'c3';

import { PRByRepository } from '../models';

@Component({
  selector: 'idc-repo-prs',
  templateUrl: './repo-prs.component.html',
  styleUrls: ['./repo-prs.component.scss'],
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoPrsComponent implements OnChanges {
  @Input() prs!: PRByRepository[] | null;

  get prQuantity(): number[] {
    return this.prs?.map(pr => pr.quantity) || [];
  }

  get prRepositories(): string[] {
    return this.prs?.map(pr => pr.repository) || [];
  }

  ngOnChanges(): void {
    if (this.prs !== undefined) {
      this.generateSvg();
    }
  }

  generateSvg(): void {
    // Bar chart config from C3
    const config: c3.ChartConfiguration = {
      bindto: '#chart-2',
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
          categories: [...this.prRepositories],
        },
      },
      legend: {
        show: false,
      },
    };

    c3.generate(config);
  }
}
