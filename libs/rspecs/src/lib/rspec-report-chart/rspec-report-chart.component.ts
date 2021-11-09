import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
} from '@angular/core';
import * as c3 from 'c3';
import { FileWithRuntime } from '../models';

import { DetailedRuntime } from '../util/detailedRuntimeReport';

@Component({
  selector: 'idc-rspec-report-chart',
  templateUrl: './rspec-report-chart.component.html',
  styleUrls: ['./rspec-report-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RspecReportChartComponent implements OnChanges {
  @Input() report: DetailedRuntime[] | null = null;

  ngOnChanges(): void {
    if (this.report !== null) {
      this.generateSvg();
    }
  }

  get filesWithRuntime(): FileWithRuntime[] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const runtimes: FileWithRuntime[] = this.report!.map(file => {
      const { runTime, filePath } = file;

      return { filePath, runTime };
    });

    return runtimes;
  }

  generateSvg(): void {
    const config: c3.ChartConfiguration = {
      bindto: '#chart',
      data: {
        columns: [
          // ['x', ...this.filesWithRuntime.map(file => file.filePath)],
          ['runtime', ...this.filesWithRuntime.map(file => file.runTime)],
        ],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'category',
          categories: this.filesWithRuntime.map(file => file.filePath),
        },
      },
    };

    c3.generate(config);
  }
}
