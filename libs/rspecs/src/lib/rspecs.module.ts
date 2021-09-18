import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportVisualizerComponent } from './report-visualizer/report-visualizer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReportVisualizerComponent },
    ]),
  ],
  declarations: [ReportVisualizerComponent],
})
export class RspecsModule {}
