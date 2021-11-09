import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ElementStep } from 'cucumber-report-analyzer';

const oneSecondInNanoseconds = 1000000000;

@Component({
  selector: 'idc-cucumber-element-step',
  templateUrl: './element-step.component.html',
  styleUrls: ['./element-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementStepComponent {
  private elementStep!: ElementStep;
  longStep = false;

  @Input() set step(elementStep: ElementStep) {
    this.elementStep = elementStep;
    if (elementStep.result.duration) {
      this.longStep = elementStep.result.duration > oneSecondInNanoseconds;
    }
  }

  get step(): ElementStep {
    return this.elementStep;
  }

  trackByFn(index: number): number {
    return index;
  }
}
