import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportVisualizerComponent } from './report-visualizer/report-visualizer.component';
import { RspecReportRuntimePipe } from './pipes/rspec-report-runtime.pipe';
import { RspecRuntimeDictionaryPipe } from './pipes/rspec-runtime-dictionary.pipe';
import { RspecReportFileListPipe } from './pipes/rspec-report-file-list.pipe';
import { RspecReportChartComponent } from './rspec-report-chart/rspec-report-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReportVisualizerComponent },
    ]),
  ],
  declarations: [
    ReportVisualizerComponent,
    RspecReportRuntimePipe,
    RspecRuntimeDictionaryPipe,
    RspecReportFileListPipe,
    RspecReportChartComponent,
  ],
})
export class RspecsModule {}
