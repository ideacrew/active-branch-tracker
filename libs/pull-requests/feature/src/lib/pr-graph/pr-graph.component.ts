import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as c3 from 'c3';

import { PRByAuthor } from '../open-pull-requests/open-pull-requests.component';

@Component({
  selector: 'idc-pr-graph',
  templateUrl: './pr-graph.component.html',
  styleUrls: ['./pr-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrGraphComponent implements OnChanges {
  @Input() prs!: PRByAuthor[] | null;

  get prQuantity(): number[] {
    return this.prs?.map(pr => pr.quantity) || [];
  }

  get prAuthors(): string[] {
    return this.prs?.map(pr => pr.author) || [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.prs !== undefined) {
      this.generateSvg();
    }
  }

  generateSvg(): void {
    // Bar chart config from C3
    const config: c3.ChartConfiguration = {
      bindto: '#chart',
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
          categories: [...this.prAuthors],
        },
      },
      legend: {
        show: false,
      },
    };
    const chart: c3.ChartAPI = c3.generate(config);
  }
}
