import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ElementStep } from '../models';

const oneSecondInNanoseconds = 1000000000;

@Component({
  selector: 'idc-cucumber-element-step',
  templateUrl: './element-step.component.html',
  styleUrls: ['./element-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementStepComponent {
  private _step!: ElementStep;
  longStep = false;

  @Input() set step(elementStep: ElementStep) {
    this._step = elementStep;
    if (elementStep.result.duration) {
      this.longStep = elementStep.result.duration > oneSecondInNanoseconds;
    }
  }

  get step(): ElementStep {
    return this._step;
  }

  trackByFn(index: number): number {
    return index;
  }
}
