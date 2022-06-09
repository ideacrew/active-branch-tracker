import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as c3 from 'c3';

import { PRByFilesChanged } from '../models';

@Component({
  selector: 'idc-prs-by-diff',
  templateUrl: './prs-by-diff.component.html',
  styleUrls: ['./prs-by-diff.component.scss'],
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrsByDiffComponent implements OnChanges {
  @Input() prs!: PRByFilesChanged[] | null;

  get filesChanged(): number[] {
    return this.prs?.map(pr => pr.filesChanged) || [];
  }

  get numberOfPrs(): number[] {
    return this.prs?.map(pr => pr.quantity) || [];
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
      bindto: '#chart-5',
      data: {
        columns: [['prs', ...this.numberOfPrs]],
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
          categories: [...this.filesChanged.map(f => `${f}`)],
        },
      },
      legend: {
        show: false,
      },
    };

    c3.generate(config);
  }
}
