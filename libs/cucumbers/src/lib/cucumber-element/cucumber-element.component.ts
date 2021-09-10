import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BackgroundElement, ScenarioElement } from '../models';

@Component({
  selector: 'idc-cucumber-element',
  templateUrl: './cucumber-element.component.html',
  styleUrls: ['./cucumber-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CucumberElementComponent {
  @Input() element!: BackgroundElement | ScenarioElement;

  trackByFn(index: number) {
    return index;
  }
}
