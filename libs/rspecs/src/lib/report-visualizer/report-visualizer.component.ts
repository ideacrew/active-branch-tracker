import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RspecReport } from '../models';
import { createDetailedRuntimeReport } from '../util/detailedRuntimeReport';

@Component({
  templateUrl: './report-visualizer.component.html',
  styleUrls: ['./report-visualizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportVisualizerComponent {
  report = new BehaviorSubject<RspecReport | null>(null);
  report$ = this.report.asObservable().pipe(map(createDetailedRuntimeReport));

  fileName = new Subject<string | undefined>();
  fileName$ = this.fileName.asObservable();

  detailedReport = new BehaviorSubject<boolean>(false);
  detailedReport$ = this.detailedReport.asObservable();

  get currentClasses(): { [key: string]: boolean } {
    return {
      detailed: this.detailedReport.value,
    };
  }

  handleFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { files } = target;

    const reader = new FileReader();
    reader.onload = () => {
      const parsedReport = JSON.parse(reader.result as string) as RspecReport;
      this.report.next(parsedReport);
    };

    if (files) {
      this.fileName.next(files[0].name);

      reader.readAsText(files[0]);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  toggleDetailedReport(): void {
    this.detailedReport.next(!this.detailedReport.value);
  }

  clearReport(): void {
    this.report.next(null);
    this.fileName.next(undefined);
  }
}
