import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CucumberFeature } from 'cucumber-report-analyzer';

@Component({
  selector: 'idc-cucumber-feature',
  templateUrl: './cucumber-feature.component.html',
  styleUrls: ['./cucumber-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CucumberFeatureComponent {
  @Input() detailedReport: boolean | null = false;

  @Input() feature!: CucumberFeature;

  trackByFn(index: number): number {
    return index;
  }
}
