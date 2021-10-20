import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { CucumberFeature } from '../models';

@Component({
  selector: 'idc-visualize-report',
  templateUrl: './visualize-report.component.html',
  styleUrls: ['./visualize-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizeReportComponent {
  report = new BehaviorSubject<CucumberFeature[] | null>(null);
  report$ = this.report.asObservable();

  fileName = new Subject<string | undefined>();
  fileName$ = this.fileName.asObservable();

  detailedReport = new BehaviorSubject<boolean>(false);
  detailedReport$ = this.detailedReport.asObservable();

  get currentClasses(): { [key: string]: boolean } {
    return {
      detailed: this.detailedReport.value,
    };
  }

  handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const { files } = target;

    const reader = new FileReader();
    reader.onload = () => {
      const parsedReport = JSON.parse(reader.result as string);
      this.report.next(parsedReport);
    };

    if (files) {
      this.fileName.next(files[0].name);

      reader.readAsText(files[0]);
    }
  }

  trackByUri(index: number, feature: CucumberFeature): string {
    return feature.uri;
  }

  toggleDetailedReport() {
    this.detailedReport.next(!this.detailedReport.value);
  }

  clearReport() {
    this.report.next(null);
    this.fileName.next(undefined);
  }
}
