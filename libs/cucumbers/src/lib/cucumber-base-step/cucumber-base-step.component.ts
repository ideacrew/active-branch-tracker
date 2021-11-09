import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseStep } from 'cucumber-report-analyzer';

const oneSecondInNanoseconds = 1000000000;

@Component({
  selector: 'idc-cucumber-base-step',
  templateUrl: './cucumber-base-step.component.html',
  styleUrls: ['./cucumber-base-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CucumberBaseStepComponent {
  private baseStep!: BaseStep;
  longStep = false;

  @Input() set step(baseStep: BaseStep) {
    this.baseStep = baseStep;
    if (baseStep.result.duration) {
      this.longStep = baseStep.result.duration > oneSecondInNanoseconds;
    }
  }
  get step(): BaseStep {
    return this.baseStep;
  }
}
