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

  handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const { files } = target;

    const reader = new FileReader();
    reader.onload = () => {
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
}
