import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as c3 from 'c3';

import { PRByAuthor } from '../models';

@Component({
  selector: 'idc-pr-graph',
  templateUrl: './pr-graph.component.html',
  styleUrls: ['./pr-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
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

  ngOnChanges(): void {
    if (this.prs !== undefined) {
      this.generateSvg1();
    }
  }

  generateSvg1(): void {
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

    c3.generate(config);
  }
}
