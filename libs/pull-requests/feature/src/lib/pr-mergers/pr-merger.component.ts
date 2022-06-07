import {
  Component,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import * as c3 from 'c3';

import { PRByAuthor } from '../models';

@Component({
  selector: 'idc-pr-merger',
  templateUrl: './pr-merger.component.html',
  styleUrls: ['./pr-merger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class PrMergersComponent implements OnChanges {
  @Input() prs!: PRByAuthor[] | null;

  get prQuantity(): number[] {
    return this.prs?.map(pr => pr.quantity) || [];
  }

  get prAuthors(): string[] {
    return this.prs?.map(pr => pr.author) || [];
  }

  constructor() {}

  ngOnChanges(): void {
    if (this.prs !== undefined) {
      this.generateSvg();
    }
  }

  generateSvg(): void {
    // Bar chart config from C3
    const config: c3.ChartConfiguration = {
      bindto: '#chart-4',
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
