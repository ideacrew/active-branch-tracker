import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckSuiteConclusion, FSWorkflowRun } from './models';

@Pipe({
  name: 'workflowStatus',
})
export class WorkflowStatusPipe implements PipeTransform {
  transform(
    workflowResults: FSWorkflowRun[] | undefined,
  ): CheckSuiteConclusion {
    if (workflowResults === undefined) {
      return 'success';
    }

    return workflowResults.some(result => result.conclusion === 'failure')
      ? 'failure'
      : 'success';
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [WorkflowStatusPipe],
  exports: [WorkflowStatusPipe],
})
export class WorkflowStatusPipeModule {}
