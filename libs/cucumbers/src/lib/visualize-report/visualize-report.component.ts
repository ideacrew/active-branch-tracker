import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
      localStorage.setItem('report', reader.result as string);
      const parsedReport = JSON.parse(reader.result as string);
      this.report.next(parsedReport);
    };

    if (files) {
      reader.readAsText(files[0]);
    }
  }

  trackByUri(index: number, feature: CucumberFeature): string {
    return feature.uri;
  }

  toggleDetailedReport() {
    this.detailedReport.next(!this.detailedReport.value);
    console.log('Toggled to', this.detailedReport.value);
  }
}
