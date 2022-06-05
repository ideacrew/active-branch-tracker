import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as c3 from 'c3';

import { PRByRepository } from '../models';

@Component({
  selector: 'idc-repo-prs',
  templateUrl: './repo-prs.component.html',
  styleUrls: ['./repo-prs.component.scss'],
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

  ngOnChanges(changes: SimpleChanges): void {
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
    const chart: c3.ChartAPI = c3.generate(config);
  }
}
