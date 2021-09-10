import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BackgroundElement, CucumberFeature, ScenarioElement } from '../models';

@Component({
  selector: 'idc-cucumber-feature',
  templateUrl: './cucumber-feature.component.html',
  styleUrls: ['./cucumber-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CucumberFeatureComponent {
  @Input() feature!: CucumberFeature;

  trackByFn(index: number) {
    return index;
  }
}
